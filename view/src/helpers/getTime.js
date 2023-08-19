
    export default function getAvailableSlots() {
        const slots = [12.30, 13.00, 13.30, 14.00, 14.30, 15.00, 19.00, 19.30, 20.00, 20.30, 21.00, 21.30, 22.00];
        const date = new Date();
        const hour = date.getHours();
        const minutes = date.getMinutes();
        let delayedHour = hour;
        let delayedMinutes = minutes + 30;
      
        if (delayedMinutes >= 60) {
          delayedHour += Math.floor(delayedMinutes / 60);
          delayedMinutes %= 60;
        }
      
        const delayedTime = delayedHour + delayedMinutes / 100;
      
        return slots
          .filter(slot => slot > delayedTime)
          .map(slot => (Number.isInteger(slot) ? slot.toString() + '.00' : slot.toString() + '0'));
      }
      
    
      