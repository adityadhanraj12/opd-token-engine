const { tokens, slots } = require('../data/store');
const { getPriority } = require('../config/priority');
const { v4: uuidv4 } = require('uuid');

/*
  BOOK TOKEN
*/
function bookToken(slot_id, patient_name, type) {

  const slot = slots.find(s => s.id === slot_id);
  if (!slot) {
    throw new Error("Slot not found");
  }

  const priority = getPriority(type);

  const token = {
    id: uuidv4(),
    slot_id,
    patient_name,
    type,
    priority,
    status: "BOOKED",
    created_at: Date.now()
  };

  // If slot has capacity → book directly
  if (slot.current_count < slot.max_capacity) {
    tokens.push(token);
    slot.current_count++;
    return token;
  }

  // If full → add to waiting
  token.status = "WAITING";
  tokens.push(token);

  return {
    message: "Slot full. Added to waiting list.",
    token
  };
}


/*
  CANCEL TOKEN
*/
function cancelToken(token_id) {

  const token = tokens.find(t => t.id === token_id);
  if (!token) {
    throw new Error("Token not found");
  }

  if (token.status !== "BOOKED") {
    throw new Error("Only booked tokens can be cancelled");
  }

  token.status = "CANCELLED";

  const slot = slots.find(s => s.id === token.slot_id);
  if (slot) {
    slot.current_count--;
  }

  // Try to reallocate from waiting list
  reallocateSlot(token.slot_id);
}


/*
  REALLOCATION LOGIC
*/
function reallocateSlot(slot_id) {

  const slot = slots.find(s => s.id === slot_id);
  if (!slot) return;

  // Find waiting tokens for this slot
  const waitingTokens = tokens
    .filter(t => t.slot_id === slot_id && t.status === "WAITING")
    .sort((a, b) => {
      if (a.priority !== b.priority) {
        return a.priority - b.priority; // higher priority first
      }
      return a.created_at - b.created_at; // FIFO inside same priority
    });

  if (waitingTokens.length === 0) return;

  if (slot.current_count < slot.max_capacity) {
    const promote = waitingTokens[0];
    promote.status = "BOOKED";
    slot.current_count++;
  }
}

module.exports = {
  bookToken,
  cancelToken
};
