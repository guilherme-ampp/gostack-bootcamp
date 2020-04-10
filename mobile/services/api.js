import axios from 'axios';

/**
 * There are different options for the baseURL depending on the environment
 * iOS on emulator: localhost
 * iOS on device: local IP address (the device must be on the same network)
 * Android on emulator: adb reverse tcp:3333 tcp:3333
 *      The Android emulator is a VM - so you need to forward the port from localhost to the emulator
 *      After setting up the adb port forwarding, use localhost
 * Android on emulator with specific IP: 10.0.2.2 (Android Studio) / 10.0.3.2 (Genymotion)
 * Android with device: local IP address (the device must be on the same network)
 */
const api = axios.create({
    baseURL: 'http://localhost:3333',
});

export default api;