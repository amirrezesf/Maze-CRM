import dayjs from "dayjs";
import jalaliday from "jalaliday";
import "dayjs/locale/fa.js";

export default defineNuxtPlugin((nuxtApp) => {
  dayjs.extend(jalaliday);
  dayjs.locale("fa");
  dayjs.calendar("jalali");

  nuxtApp.provide("dayjs", dayjs);
});
