import Razorpay from 'razorpay';

let _instance = null;

export function isSimulationMode() {
  const key = process.env.RAZORPAY_KEY_ID || '';
  return key.includes('XXX') || key.includes('xxxx') || key === '' || key === 'your_razorpay_key_id';
}

export function getRazorpay() {
  if (isSimulationMode()) return null;
  if (!_instance) {
    try {
      _instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });
    } catch {
      _instance = null;
    }
  }
  return _instance;
}