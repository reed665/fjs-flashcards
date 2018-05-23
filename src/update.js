import * as R from 'ramda'

export const sortCards = R.sortWith([
  R.ascend(R.prop('rank'))
])

export default function update(msg, model) {
  return model
}
