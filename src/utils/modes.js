// Silent + Maintenance Modes
let silentMode = false;
let maintenanceMode = false;

module.exports = {
  isSilent() {
    return silentMode;
  },
  toggleSilent() {
    silentMode = !silentMode;
    return silentMode;
  },
  isMaintenance() {
    return maintenanceMode;
  },
  toggleMaintenance() {
    maintenanceMode = !maintenanceMode;
    return maintenanceMode;
  }
};
