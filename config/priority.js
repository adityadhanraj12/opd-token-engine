const PRIORITY_MAP = {
  EMERGENCY: 1,
  PAID: 2,
  FOLLOW_UP: 3,
  ONLINE: 4,
  WALK_IN: 5
};

function getPriority(type) {
  return PRIORITY_MAP[type] || 5;
}

module.exports = { getPriority };
