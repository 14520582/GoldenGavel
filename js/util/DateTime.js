import moment from 'moment'
class DateTime {
  static convertStringToNumber(datestr) {
    let pattern = /(\d{2})-(\d{2})-(\d{4})/;
    let date = new Date(moment(datestr.replace(pattern,'$3-$2-$1')).format())
    return date.getTime()
  }
  static isEnded(endtime) {
    let now = new Date()
    let distance = (endtime - now.getTime())
    if(distance < 0)
      return true
    else
      return false
  }
  static convertToStringTime(endtime) {
    let now = new Date()
    let distance = (endtime - now.getTime())/60000
    if(distance < 0)
     return 'Ended'
    let days = Math.floor(distance / 1440)
    let hours = Math.floor((distance % 1440)/60)
    if(hours < 10)
      hours = '0'+hours
    if( days > 0)
    {
      if(days < 10)
          days = '0'+days
      return days+'d '+hours+'h'
    }
    else{
      let minutes = Math.floor(distance % 60)
      if(minutes < 10)
         minutes = '0'+minutes
      return hours+'h '+minutes+'m'
    }
    return 'null'
  }
}
module.exports = DateTime;
