/**
 * Created by anker on 16/12/27.
 */
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import common from './common'

const all = {
  cn: Object.assign({}, zhLocale),
  en: Object.assign({}, enLocale)
}

all['cn']['common'] = common['cn']
all['en']['common'] = common['en']

export default all
