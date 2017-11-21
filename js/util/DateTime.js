import moment from 'moment'
class DateTime {
  static convertStringToNumber(datestr) {
    let pattern = /(\d{2})-(\d{2})-(\d{4})/;
    let date = new Date(moment(datestr.replace(pattern,'$3-$2-$1')).format())
    return date.getTime()
  }
}
module.exports = DateTime;
