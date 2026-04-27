// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

let userSelectedDate = null;
refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const chosenDate = selectedDates[0];
    if (chosenDate < new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      refs.startBtn.disabled = true;
    } else {
      userSelectedDate = chosenDate;
      refs.startBtn.disabled = false;
    }
    console.log(selectedDates[0]);
  },
};
flatpickr(refs.input, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

refs.startBtn.addEventListener('click', () => {
  refs.input.disabled = true;
  refs.startBtn.disabled = true;
  const interval = setInterval(() => {
    const ms = userSelectedDate - new Date();
    if (ms < 0) {
      clearInterval(interval);
      return;
    }

    const timeData = convertMs(ms);
    // refs.days.textContent = addLeadingZero(timeData.days);
    // refs.hours.textContent = addLeadingZero(timeData.hours);
    // refs.minutes.textContent = addLeadingZero(timeData.minutes);
    // refs.seconds.textContent = addLeadingZero(timeData.seconds);
    Object.keys(timeData).forEach(key => {
      refs[key].textContent = addLeadingZero(timeData[key]);
    });

    console.log(timeData);
  }, 1000);
});
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
