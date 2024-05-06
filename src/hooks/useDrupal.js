import { useContext, useMemo } from 'react'
import _ from 'lodash'
import { GlobalContext } from '../contexts/context'


const useDrupal = (uuid, getContents = _.noop) => {
  const { contents } = useContext(GlobalContext)
  const data = useMemo(() => contents &&
    _.find(getContents(contents), { uuid }),
    [contents, uuid]
  )

  return data
}

export default useDrupal