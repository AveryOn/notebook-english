import moment from "moment";


export default function useFormatted() {

    function replaceDateTimeSrting(dateTime, template, utcOffset) {
        try {
          if (utcOffset) {
            return moment(dateTime)
              .utcOffset(utcOffset)
              .format(template ?? "HH:mm:ss / ll");
          } else {
            return moment(dateTime)
              .utcOffset("+03:00")
              .format(template ?? "HH:mm:ss / ll");
          }
        } catch (err) {
          console.error(`/store/mainStore.js: replaceDateTimeSrting => ${err}`)
        }
    }

    return {
        // Methods
        replaceDateTimeSrting
    }
}