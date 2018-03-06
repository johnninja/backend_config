export default {
	used: [
		{name:'使用用户总览', path: '/used/activity', node: 'report_used_activity'},
		{name:'学生活跃新增', path: '/used/new', node: 'report_used_new'},
		{name:'学校老师数据', path: '/used/schools', node: 'report_used_school'},
		{name:'城市数据', path: '/used/cities', node: 'report_used_city'},
		// {name:'学生数据', path: '/used/students', node: 'report_used_activity'},
		// {name:'日数据', path: '/used/daily', node: 'report_used_activity'},
		{name:'付费用户使用', path: '/used/payment', node: 'report_used_payment'},
		{name:'平均使用时长', path: '/used/time', node: 'report_used_time'},
		{name:'平均学习时长', path: '/used/study_time', node: 'report_study_time'},
		{name:'访次分布(手机)', path: '/used/visit_phone', node: 'report_visit_has_phone'},
		{name:'学生活跃新增(手机)', path: '/used/new_phone', node: 'report_new_has_phone'},
		{name:'平均使用时长(手机)', path: '/used/time_phone', node: 'report_used_time_phone'},
		{name:'用户粘性', path: '/used/stick', node: 'report_used_stick'},
	],
	kindergarten: [
		{name:'用户规模', path: '/kindergarten/kind_total', node: 'report_used_total_user'},
		{name:'付费总览', path: '/kindergarten/payment_overview', node: 'report_kindergarten_payment'},
		{name:'付费使用', path: '/kindergarten/payment_used', node: 'report_kindergarten_payment_used'},
		{name:'学习管理', path: '/kindergarten/study', node: 'report_kindergarten_study'},
	],
	payment: [
		{name:'整体付费金额', path: '/payment/total', node: 'report_payment_total'},
		{name:'VIP服务学员', path: '/payment/one_to_one', node: 'report_payment_one_to_one'},
		{name:'高级服务学员', path: '/payment/small_class', node: 'report_payment_small_class'},
		{name:'仅购基础服务学员', path: '/payment/overview', node: 'report_payment_overview'},
		{name:'VIP学员首单复购', path: '/payment/vip_buy', node: 'report_vip_buy'},
		{name:'高级学员首单复购', path: '/payment/senior_buy', node: 'report_senior_buy'},
		{name:'普通学员首单复购', path: '/payment/ordinary_buy', node: 'report_ordinary_buy'},
		{name:'高级学员/VIP学员', path: '/payment/senior', node: 'report_payment_senior'},
		{name:'付费转化率', path: '/payment/conversion', node: 'report_payment_conversion'},
		{name:'付费服务期人数(严格标准)', path: '/payment/inservice_strict', node: 'report_payment_strict'},
		{name:'付费服务期人数', path: '/payment/inservice', node: 'report_payment_nonstrict'},
		{name:'付费服务流失率', path: '/payment/lost', node: 'report_payment_lost'},
		{name:'VIP国际班', path: '/payment/new_package', node: 'report_payment_vip'},
		// {name:'付费维度细分', node: 'report_payment_lost', children: [
		// 	{name:'整体付费', path: '/payment/ordinary', node: 'report_payment_ordinary'},
		// 	{name:'iOS/Android付费', path: '/payment/system', node: 'report_payment_lost'},
		// 	{name:'B端/C端付费', path: '/payment/client', node: 'report_payment_lost'},
		// ]},
		{name:'整体付费', path: '/payment/ordinary', node: 'report_payment_ordinary'},
		{name:'iOS/Android付费', path: '/payment/system', node: 'report_payment_system'},
		{name:'学校/自发付费', path: '/payment/client', node: 'report_payment_client'},
	],
	course: [
		{name:'上课人次', path: '/course/size', node: 'report_course_size'},
		{name:'上课异常', path: '/course/abnormal',  node: 'report_course_abnormal'},
		{name:'老师表现', path: '/course/teacher',  node: 'report_course_teacher'},
	],
	sales: [
		{name:'抽奖转化', path: '/sales/lottery', node: 'report_sales_lottery'},
		{name:'付费分层', path: '/sales/payment', node: 'report_sales_rebuy'},
		/* out date 
		* {name:'学员沟通', path: '/sales/communicate', node: 'report_sales_communicate'},
		*/
		{name:'学院销售', path: '/sales/college_sales', node: 'report_sales_college_sales'},
		/* out date 
		* {name:'学院学员续费', path: '/sales/college_renew', node: 'report_sales_college_renew'},
		* {name:'学院小班课续费', path: '/sales/college_private_renew', node: 'report_sales_college_private_renew'},
		* {name:'学院1对1续费', path: '/sales/college_one_renew', node: 'report_sales_college_one_renew'},
		*/
		{name:'个人学员管理', path: '/sales/personal_manage', node: 'report_sales_personal_manage'},
		{name:'个人销售排行', path: '/sales/personal_sales', node: 'report_sales_personal_sales'},
		{name:'个人学员续费', path: '/sales/student_renew', node: 'report_sales_student_renew'},
		{name:'个人小班课续费', path: '/sales/class_renew', node: 'report_sales_class_renew'},
		{name:'个人1对1续费', path: '/sales/one_to_one_renew', node: 'report_sales_one_to_one_renew'},
	],
	monitor: [
		{name:'学员免费体验', path: '/monitor/free', node: 'report_monitor_free'},
		{name:'学员抽奖1月', path: '/monitor/month', node: 'report_monitor_month'},
		{name:'学员抽奖1年', path: '/monitor/year', node: 'report_monitor_year'},
		{name:'幼儿园抽奖', path: '/monitor/kindergarten', node: 'report_monitor_kindergarten'},
		{name:'小班课抽奖优惠券', path: '/monitor/private_lottery', node: 'report_monitor_private_lottery'},
		{name:'小班课抽奖体验课', path: '/monitor/private_study', node: 'report_monitor_private_study'},
		{name:'1对1抽奖优惠券', path: '/monitor/one_to_one_lottery', node: 'report_monitor_one_to_one_lottery'},
		{name:'1对1抽奖体验课', path: '/monitor/one_to_one_study', node: 'report_monitor_one_to_one_study'},
		{name:'高级学员抽奖', path: '/monitor/senior_lottery', node: 'report_monitor_senior_lottery'},
		{name:'高级学员抽奖-已联系', path: '/monitor/senior_contacted', node: 'report_monitor_contacted'},
		{name:'高级学员抽奖-未联系', path: '/monitor/senior_not_contacted', node: 'report_monitor_not_contacted'},
		{name:'高级学员8元抽奖-已联系', path: '/monitor/senior_eight_lottery', node: 'report_monitor_eight_lottery_contacted'},
		{name:'高级学员8元抽奖-未联系', path: '/monitor/senior_eight_noncontacted', node: 'report_monitor_eight_not_contacted'},
	],
	study: [
		{name:'新用户', path: '/study/new', node: 'report_study_new'},
		{name:'整体', path: '/study/total', node: 'report_study_total'},
		{name:'付费用户', path: '/study/payment', node: 'report_study_payment'},
		{name:'付费班级用户', path: '/study/payment_class', node: 'report_study_payment_class'},
		{name:'转化管理', path: '/study/conversion', node: 'report_study_conversion'},
		{name:'新用户(手机)', path: '/study/new_phone', node: 'report_study_new_phone'},
		{name:'整体(手机)', path: '/study/total_phone', node: 'report_study_total_phone'},
		{name:'转化管理(手机)', path: '/study/conversion_phone', node: 'report_study_conversion_phone'},
	],
	push: [
		{name:'星级推送沟通(升级中)', path: '/push/vip', node: 'report_push_vip_communicate'},
		{name:'星级学生分布', path: '/push/star_students', node: 'report_push_star_students'},
		{name:'沟通统计-整体(升级中)', path: '/push/total', node: 'report_push_total_communicate'},
		{name:'每日沟通统计-学院(升级中)', path: '/push/daily_college', node: 'report_push_daily_college'},
		{name:'每日沟通统计-个人(升级中)', path: '/push/daily_single', node: 'report_push_daily_single'},
		{name:'人均处理情况(升级中)', path: '/push/per_capita', node: 'report_push_percapita'},
		/* out date
		* {name:'沟通统计-学员细分', path: '/push/cumulative', node: 'report_push_cumulative'},
		* {name:'48小时推送处理情况', path: '/push/students', node: 'report_push_students'},
		* {name:'48小时学员有效沟通', path: '/push/communicate', node: 'report_push_communicate'},
		* {name:'48小时学员无效沟通', path: '/push/ineffective', node: 'report_push_ineffective'},
		* {name:'48小时学员没有处理', path: '/push/not_deal', node: 'report_push_not_deal'},
		*/
		{name:'学习推送数量', path: '/push/message', node: 'report_push_total'},
		{name:'学习推送没有处理排行(升级中)', path: '/push/deal', node: 'report_push_deal'},
		/* out date
		* {name:'学员有效推送处理排行-学院', path: '/push/rank_college', node: 'report_push_rank_college'},
		* {name:'学员有效推送处理排行-个人', path: '/push/rank_mentor', node: 'report_push_rank_mentor'},
		*/
		{name:'老师帐号(升级中)', path: '/push/mentor', node: 'report_push_mentor'}
	],
	months: [
		{name:'支付情况', path: '/months/payment', node: 'report_months_payment'},
	],
	extend: [
		{name:'总览', path: '/extend/overview', node: 'report_extend_overview'},
		{name:'iOS', path: '/extend/ios', node: 'report_extend_ios'},
		{name:'Android', path: '/extend/android', node: 'report_extend_android'},
	],
	generate: [
		{name:'生成图表', path: '/generate', node: 'report_push_mentor'}
	],
	eleven: [
		{name:'整体推送处理', path: '/eleven/total', node: 'report_eleven_total'},
		{name:'个人推送处理', path: '/eleven/personal', node: 'report_eleven_personal'},
		{name:'年度大单排行', path: '/eleven/single', node: 'report_eleven_sales'},
		{name:'学院大单排行', path: '/eleven/college', node: 'report_eleven_sales'},
		{name:'学期半价排行', path: '/eleven/sales', node: 'report_eleven_sales'},
		{name:'VIP学员抽奖', path: '/eleven/vip_lottery', node: 'report_monitor_vip_lottery'},
		{name:'VIP学员抽奖明细', path: '/eleven/vip_lottery_detail', node: 'report_monitor_vip_lottery'},
		{name:'推荐用户', path: 'http://192.168.1.253:8989/boxfish/#/management/reference', absolute: true, node: 'report_monitor_vip_lottery'},
	],
	assets: [
		{name:'整体各层级用户数', path: '/assets/total', node: 'report_assets_total'},
		{name:'B11用户', path: '/assets/b11', node: 'report_assets_b11'},
		{name:'B13用户', path: '/assets/b13', node: 'report_assets_b13'},
		{name:'个人用户分层', path: '/assets/mentor', node: 'report_assets_mentor'},
		{name:'用户分层打印', path: '/assets/print', node: 'report_assets_print'},
	],
	school: [
		{name: '教学顾问周活', path: '/school/tc_wau', node: 'report_tc_wau'}
	]
}