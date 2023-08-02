// yarn node ./database/commitment.js

import { readFileSync } from 'fs'

import pg from 'pg'
import { read } from 'xlsx/xlsx.mjs'

const PGURI = 'postgresql://lofin_admin:LOFpostgres159!@127.0.0.1:54321/lofin?sslmode=disable'
const client = await new pg.Pool({ connectionString: PGURI }).connect()
const { rows } = await client.query('SELECT CURRENT_TIMESTAMP')
console.log(`🚅 Connected to ${PGURI} at ${new Date(rows[0].current_timestamp).toLocaleString()}`)

const isHeader = /[A-Z]+1$/
const workbook = read(readFileSync('./database/공약 예산.xlsx'))

const electionCategory = {
  지자체장: 0,
  교육감: 1,
  대통령: 2,
}

const sigungu = {
  전국: 0,
  서울교육감: 11,
  부산교육감: 26,
  대구교육감: 27,
  인천교육감: 28,
  광주교육감: 29,
  대전교육감: 30,
  울산교육감: 31,
  세종교육감: 32,
  경기교육감: 41,
  강원교육감: 42,
  충북교육감: 43,
  충남교육감: 44,
  전북교육감: 45,
  전남교육감: 46,
  경북교육감: 47,
  경남교육감: 48,
  제주교육감: 49,
  서울본청: 1100000,
  서울종로구: 1111000,
  서울중구: 1112000,
  서울용산구: 1113000,
  서울성동구: 1114000,
  서울광진구: 1115000,
  서울동대문구: 1116000,
  서울중랑구: 1117000,
  서울성북구: 1118000,
  서울강북구: 1119000,
  서울도봉구: 1120000,
  서울노원구: 1121000,
  서울은평구: 1122000,
  서울서대문구: 1123000,
  서울마포구: 1124000,
  서울양천구: 1125000,
  서울강서구: 1126000,
  서울구로구: 1127000,
  서울금천구: 1128000,
  서울영등포구: 1129000,
  서울동작구: 1130000,
  서울관악구: 1131000,
  서울서초구: 1132000,
  서울강남구: 1133000,
  서울송파구: 1134000,
  서울강동구: 1135000,
  부산본청: 2600000,
  부산중구: 2611000,
  부산서구: 2612000,
  부산동구: 2613000,
  부산영도구: 2614000,
  부산진구: 2615000,
  부산동래구: 2616000,
  부산남구: 2617000,
  부산북구: 2618000,
  부산해운대구: 2619000,
  부산사하구: 2620000,
  부산금정구: 2621000,
  부산강서구: 2622000,
  부산연제구: 2623000,
  부산수영구: 2624000,
  부산사상구: 2625000,
  부산기장군: 2671000,
  대구본청: 2700000,
  대구중구: 2711000,
  대구동구: 2712000,
  대구서구: 2713000,
  대구남구: 2714000,
  대구북구: 2715000,
  대구수성구: 2716000,
  대구달서구: 2717000,
  대구달성군: 2771000,
  인천본청: 2800000,
  인천중구: 2811000,
  인천동구: 2812000,
  인천미추홀구: 2813000,
  인천연수구: 2814000,
  인천남동구: 2815000,
  인천부평구: 2816000,
  인천계양구: 2817000,
  인천서구: 2818000,
  인천강화군: 2871000,
  인천옹진군: 2872000,
  광주본청: 2900000,
  광주동구: 2911000,
  광주서구: 2912000,
  광주남구: 2913000,
  광주북구: 2914000,
  광주광산구: 2915000,
  대전본청: 3000000,
  대전동구: 3011000,
  대전중구: 3012000,
  대전서구: 3013000,
  대전유성구: 3014000,
  대전대덕구: 3015000,
  울산본청: 3100000,
  울산중구: 3111000,
  울산남구: 3112000,
  울산동구: 3113000,
  울산북구: 3114000,
  울산울주군: 3171000,
  세종본청: 3200000,
  경기본청: 4100000,
  경기수원시: 4111000,
  경기성남시: 4112000,
  경기의정부시: 4113000,
  경기안양시: 4114000,
  경기부천시: 4115000,
  경기광명시: 4116000,
  경기평택시: 4117000,
  경기동두천시: 4118000,
  경기안산시: 4119000,
  경기고양시: 4120000,
  경기과천시: 4121000,
  경기구리시: 4122000,
  경기남양주시: 4123000,
  경기오산시: 4124000,
  경기시흥시: 4125000,
  경기군포시: 4126000,
  경기의왕시: 4127000,
  경기하남시: 4128000,
  경기용인시: 4129000,
  경기파주시: 4130000,
  경기이천시: 4131000,
  경기안성시: 4132000,
  경기김포시: 4133000,
  경기화성시: 4134000,
  경기광주시: 4135000,
  경기양주시: 4136000,
  경기포천시: 4137000,
  경기여주시: 4138000,
  경기연천군: 4175000,
  경기가평군: 4177000,
  경기양평군: 4178000,
  강원본청: 4200000,
  강원춘천시: 4211000,
  강원원주시: 4212000,
  강원강릉시: 4213000,
  강원동해시: 4214000,
  강원태백시: 4215000,
  강원속초시: 4216000,
  강원삼척시: 4217000,
  강원홍천군: 4271000,
  강원횡성군: 4272000,
  강원영월군: 4273000,
  강원평창군: 4274000,
  강원정선군: 4275000,
  강원철원군: 4276000,
  강원화천군: 4277000,
  강원양구군: 4278000,
  강원인제군: 4279000,
  강원고성군: 4280000,
  강원양양군: 4281000,
  충북본청: 4300000,
  충북충주시: 4312000,
  충북제천시: 4313000,
  충북청주시: 4314000,
  충북보은군: 4372000,
  충북옥천군: 4373000,
  충북영동군: 4374000,
  충북진천군: 4375000,
  충북괴산군: 4376000,
  충북음성군: 4377000,
  충북단양군: 4378000,
  충북증평군: 4379000,
  충남본청: 4400000,
  충남천안시: 4411000,
  충남공주시: 4412000,
  충남보령시: 4413000,
  충남아산시: 4414000,
  충남서산시: 4415000,
  충남논산시: 4416000,
  충남계룡시: 4417000,
  충남당진시: 4418000,
  충남금산군: 4471000,
  충남부여군: 4473000,
  충남서천군: 4474000,
  충남청양군: 4475000,
  충남홍성군: 4476000,
  충남예산군: 4477000,
  충남태안군: 4478000,
  전북본청: 4500000,
  전북전주시: 4511000,
  전북군산시: 4512000,
  전북익산시: 4513000,
  전북정읍시: 4514000,
  전북남원시: 4515000,
  전북김제시: 4516000,
  전북완주군: 4571000,
  전북진안군: 4572000,
  전북무주군: 4573000,
  전북장수군: 4574000,
  전북임실군: 4575000,
  전북순창군: 4576000,
  전북고창군: 4577000,
  전북부안군: 4578000,
  전남본청: 4600000,
  전남목포시: 4611000,
  전남여수시: 4612000,
  전남순천시: 4613000,
  전남나주시: 4614000,
  전남광양시: 4615000,
  전남담양군: 4671000,
  전남곡성군: 4672000,
  전남구례군: 4673000,
  전남고흥군: 4674000,
  전남보성군: 4675000,
  전남화순군: 4676000,
  전남장흥군: 4677000,
  전남강진군: 4678000,
  전남해남군: 4679000,
  전남영암군: 4680000,
  전남무안군: 4681000,
  전남함평군: 4682000,
  전남영광군: 4683000,
  전남장성군: 4684000,
  전남완도군: 4685000,
  전남진도군: 4686000,
  전남신안군: 4687000,
  경북본청: 4700000,
  경북포항시: 4711000,
  경북경주시: 4712000,
  경북김천시: 4713000,
  경북안동시: 4714000,
  경북구미시: 4715000,
  경북영주시: 4716000,
  경북영천시: 4717000,
  경북상주시: 4718000,
  경북문경시: 4719000,
  경북경산시: 4720000,
  경북군위군: 4771000,
  경북의성군: 4772000,
  경북청송군: 4773000,
  경북영양군: 4774000,
  경북영덕군: 4775000,
  경북청도군: 4776000,
  경북고령군: 4777000,
  경북성주군: 4778000,
  경북칠곡군: 4779000,
  경북예천군: 4780000,
  경북봉화군: 4781000,
  경북울진군: 4782000,
  경북울릉군: 4783000,
  경남본청: 4800000,
  경남창원시: 4811000,
  경남진주시: 4813000,
  경남통영시: 4815000,
  경남사천시: 4816000,
  경남김해시: 4817000,
  경남밀양시: 4818000,
  경남거제시: 4819000,
  경남양산시: 4820000,
  경남의령군: 4871000,
  경남함안군: 4872000,
  경남창녕군: 4873000,
  경남고성군: 4874000,
  경남남해군: 4875000,
  경남하동군: 4876000,
  경남산청군: 4877000,
  경남함양군: 4878000,
  경남거창군: 4879000,
  경남합천군: 4880000,
  제주본청: 4900000,
}

const sectors = {
  '입법 및 선거관리': 11,
  '지방행정·재정지원': 13,
  '재정·금융': 14,
  일반행정: 16,
  경찰: 23,
  '재난방재·민방위': 25,
  소방: 26,
  '유아 및 초중등교육': 51,
  고등교육: 52,
  '평생·직업교육': 53,
  문화예술: 61,
  관광: 62,
  체육: 63,
  문화재: 64,
  문화및관광일반: 65,
  '상하수도·수질': 71,
  폐기물: 72,
  대기: 73,
  자연: 74,
  해양: 75,
  환경보호일반: 76,
  기초생활보장: 81,
  취약계층지원: 82,
  '보육·가족및여성': 84,
  '노인·청소년': 85,
  노동: 86,
  보훈: 87,
  주택: 88,
  사회복지일반: 89,
  보건의료: 91,
  식품의약안전: 93,
  '농업·농촌': 101,
  '임업·산촌': 102,
  '해양수산·어촌': 103,
  산업금융지원: 111,
  산업기술지원: 112,
  '무역 및 투자유치': 113,
  '산업진흥·고도화': 114,
  에너지및자원개발: 115,
  '산업·중소기업일반': 116,
  도로: 121,
  도시철도: 123,
  '해운·항만': 124,
  '항공·공항': 125,
  '대중교통·물류등기타': 126,
  수자원: 141,
  지역및도시: 142,
  산업단지: 143,
  기술개발: 151,
  과학기술연구지원: 152,
  과학기술일반: 153,
  예비비: 161,
  기타: 901,
}

try {
  await client.query('BEGIN')

  for (const sheetName of workbook.SheetNames) {
    // if (sheetName !== '서울강동구') continue

    if (
      !sheetName.startsWith('서울본청') &&
      sheetName !== '서울강동구' &&
      sheetName !== '서울교육감' &&
      sheetName !== '경기교육감'
    )
      continue

    console.log('👀 ~ sheetName:', sheetName)

    const sheet = workbook.Sheets[sheetName]
    const cells = Object.keys(sheet)
    const lastRowIndex = cells.slice(cells.length - 2)[0].slice(1)

    const {
      titleHeader,
      contentHeader,
      electionCategoryHeader,
      electionDateHeader,
      primaryDeptHeader,
      supportDeptHeader,
      mainBodyHeader,
      startPeriodHeader,
      endPeriodHeader,
      fieldHeader,
      sectorHeader,
      priorityHeader,
      progressHeader,
      centerGovAidHeader,
      basisDateHeader,
      financeTitleHeader,
      financeCategoryHeader,
      fiscalYearHeader,
      govHeader,
      sidoHeader,
      sigunguHeader,
      etcHeader,
      unitHeader,
    } = getHeaderPosition(
      sheet,
      cells.filter((key) => isHeader.test(key))
    )

    const commitmentRowIds = cells
      .filter((key) => key.startsWith('A') && key !== 'A1')
      .map((key) => +key.slice(1))

    const { rows } = await client.query(
      `SELECT id 
      FROM election 
      WHERE category = $1 
        AND election_date = $2 
        AND district = $3`,
      [
        electionCategory[sheet[`${electionCategoryHeader}2`]?.w],
        sheet[`${electionDateHeader}2`]?.w,
        sigungu[sheetName.split('-')[0]],
      ]
    )

    const electionId = +rows[0]?.id

    for (let i = 0; i < commitmentRowIds.length; i++) {
      const commitmentRowId = commitmentRowIds[i]

      const { rows } = await client.query(
        `INSERT INTO commitment (
          title,
          content,
          primary_dept,
          support_dept,
          main_body,
          start_period,
          end_period,
          field_code,
          sector_code,
          priority,
          progress,
          center_gov_aid,
          election_id
        ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        RETURNING id`,
        [
          sheet[`${titleHeader}${commitmentRowId}`].w.replace(/^\s+|\s+$/gm, ''),
          sheet[`${contentHeader}${commitmentRowId}`]?.w.replace(/^\s+|\s+$/gm, ''),
          sheet[`${primaryDeptHeader}${commitmentRowId}`].w
            .split(',')
            .map((c) => c.replace(/^\s+|\s+$/gm, '')),
          sheet[`${supportDeptHeader}${commitmentRowId}`]?.w
            .split(',')
            .map((c) => c.replace(/^\s+|\s+$/gm, '')),
          sheet[`${mainBodyHeader}${commitmentRowId}`]?.w
            .split(',')
            .map((c) => c.replace(/^\s+|\s+$/gm, '')),
          getStartPeriodCode(
            sheet[`${startPeriodHeader}${commitmentRowId}`].w.replace(/^\s+|\s+$/gm, '')
          ),
          getEndPeriodCode(
            sheet[`${endPeriodHeader}${commitmentRowId}`]?.w.replace(/^\s+|\s+$/gm, '')
          ),
          getFieldCode(sheet[`${fieldHeader}${commitmentRowId}`].w.replace(/^\s+|\s+$/gm, '')),
          sectors[sheet[`${sectorHeader}${commitmentRowId}`]?.w.replace(/^\s+|\s+$/gm, '')],
          sheet[`${priorityHeader}${commitmentRowId}`]?.w.replace(/^\s+|\s+$/gm, ''),
          getProgessCode(
            sheet[`${progressHeader}${commitmentRowId}`]?.w.replace(/^\s+|\s+$/gm, '')
          ),
          sheet[`${centerGovAidHeader}${commitmentRowId}`]?.w
            .split(',')
            .map((c) => getCenterGovAidCode(c.replace(/^\s+|\s+$/gm, ''))),
          electionId,
        ]
      )

      const commitmentId = +rows[0].id

      const promises = []

      let lastTitle
      let lastBasisDate
      let lastCategory
      const unit = +sheet[`${unitHeader}1`].v.match(/\d+/g).pop()

      for (let j = commitmentRowId; j < (commitmentRowIds[i + 1] ?? +lastRowIndex + 1); j++) {
        console.log('👀 ~ j:', j)

        const basisDate = sheet[`${basisDateHeader}${j}`]?.w
        const title = sheet[`${financeTitleHeader}${j}`]?.w
        const category = sheet[`${financeCategoryHeader}${j}`]?.w

        if (title) lastTitle = title
        if (basisDate) lastBasisDate = basisDate
        if (category) lastCategory = category

        const values =
          lastCategory === '예산' || lastCategory === '집행'
            ? [
                title ?? lastTitle,
                new Date(basisDate ?? lastBasisDate),
                getFinanceCategoryCode(category ?? lastCategory),
                +sheet[`${fiscalYearHeader}${j}`].v,
                getMoney(sheet[`${govHeader}${j}`]?.v, unit),
                getMoney(sheet[`${sidoHeader}${j}`]?.v, unit),
                getMoney(sheet[`${sigunguHeader}${j}`]?.v, unit),
                getMoney(sheet[`${etcHeader}${j}`]?.v, unit),
                commitmentId,
              ]
            : [
                title ?? lastTitle,
                new Date(basisDate ?? lastBasisDate),
                getFinanceCategoryCode(category ?? lastCategory),
                null,
                null,
                null,
                null,
                null,
                commitmentId,
              ]

        const promise = client.query(
          `INSERT INTO finance (
              title,
              basis_date,
              category,
              fiscal_year,
              gov,
              sido,
              sigungu,
              etc,
              commitment_id
            ) 
            VALUES (
              $1, $2, $3, $4, $5, $6, $7, $8, $9
            )`,
          values
        )

        promises.push(promise)
      }

      await Promise.all(promises)
    }
  }

  await client.query('COMMIT')
} catch (error) {
  await client.query('ROLLBACK')
  throw error
} finally {
  client.release()
}

function getFirstEnglishPart(str) {
  const match = str.match(/^[a-zA-Z]+/)
  return match ? match[0] : ''
}

function getHeaderPosition(sheet, headers) {
  const result = {}

  for (const header of headers) {
    if (sheet[header].v === '공약명') result.titleHeader = getFirstEnglishPart(header)
    else if (sheet[header].v === '정책목표') result.contentHeader = getFirstEnglishPart(header)
    else if (sheet[header].v === '선거일') result.electionDateHeader = getFirstEnglishPart(header)
    else if (sheet[header].v === '선거종류')
      result.electionCategoryHeader = getFirstEnglishPart(header)
    else if (sheet[header].v === '선거구')
      result.electionDistrictHeader = getFirstEnglishPart(header)
    else if (sheet[header].v === '주관부서') result.primaryDeptHeader = getFirstEnglishPart(header)
    else if (sheet[header].v === '협조부서') result.supportDeptHeader = getFirstEnglishPart(header)
    else if (sheet[header].v === '사업주체') result.mainBodyHeader = getFirstEnglishPart(header)
    else if (sheet[header].v === '시작시기') result.startPeriodHeader = getFirstEnglishPart(header)
    else if (sheet[header].v === '완료시기') result.endPeriodHeader = getFirstEnglishPart(header)
    else if (sheet[header].v === '분야') result.fieldHeader = getFirstEnglishPart(header)
    else if (sheet[header].v === '부문') result.sectorHeader = getFirstEnglishPart(header)
    else if (sheet[header].v === '우선순위') result.priorityHeader = getFirstEnglishPart(header)
    else if (sheet[header].v === '추진상황') result.progressHeader = getFirstEnglishPart(header)
    else if (sheet[header].v === '중앙정부 지원')
      result.centerGovAidHeader = getFirstEnglishPart(header)
    else if (sheet[header].v === '기준일') result.basisDateHeader = getFirstEnglishPart(header)
    else if (sheet[header].v === '과제명') result.financeTitleHeader = getFirstEnglishPart(header)
    else if (sheet[header].v === '유형') result.financeCategoryHeader = getFirstEnglishPart(header)
    else if (sheet[header].v === '회계년도') result.fiscalYearHeader = getFirstEnglishPart(header)
    else if (sheet[header].v === '국비' || sheet[header].v === '국고/특교')
      result.govHeader = getFirstEnglishPart(header)
    else if (sheet[header].v === '시도비' || sheet[header].v === '자체')
      result.sidoHeader = getFirstEnglishPart(header)
    else if (sheet[header].v === '시군구비' || sheet[header].v === '지자체')
      result.sigunguHeader = getFirstEnglishPart(header)
    else if (sheet[header].v === '기타' || sheet[header].v === '민간/기타')
      result.etcHeader = getFirstEnglishPart(header)
    else if (sheet[header].v.startsWith('단위:')) result.unitHeader = getFirstEnglishPart(header)
  }

  return result
}

function getFieldCode(field) {
  switch (field) {
    case '일반공공행정':
    case '행정':
      return 10
    case '공공질서 및 안전':
    case '안전':
      return 20
    case '교육':
      return 50
    case '문화 및 관광':
    case '문화':
    case '관광':
      return 60
    case '환경':
      return 70
    case '사회복지':
    case '돌봄':
    case '복지':
      return 80
    case '보건':
      return 90
    case '농림해양수산':
      return 100
    case '산업·중소기업 및 에너지':
    case '경제':
      return 110
    case '교통 및 물류':
    case '교통':
      return 120
    case '국토 및 지역개발':
      return 140
    case '과학기술':
      return 150
    case '예비비':
      return 160
    case '기타':
      return 900
    default:
      throw Error(`정의되지 않은 \`field\`입니다. ${field}`)
  }
}

function getSectorCode(sector) {
  switch (sector) {
    case null:
    case undefined:
      return null
    default:
      throw Error(`정의되지 않은 \`sector\` 입니다. ${sector}`)
  }
}

function getProgessCode(progress) {
  switch (progress) {
    case undefined:
      return null
    case '추진완료':
    case '완료':
      return 0
    case '이행 후 계속추진':
      return 1
    case '정상추진':
    case '추진중':
      return 2
    case '일부추진':
      return 3
    case '보류':
      return 4
    case '폐기':
      return 5
    default:
      throw Error(`정의되지 않은 \`progress\`입니다. ${progress}`)
  }
}

function getCenterGovAidCode(centerGovAid) {
  switch (centerGovAid) {
    case '재정':
      return 0
    case '제도':
      return 1
    case '권한':
      return 2
    default:
      return null
  }
}

function getStartPeriodCode(startPeriod) {
  switch (startPeriod) {
    case '신규':
      return 0
    case '폐지 후 신규':
      return 1
    case '계속':
      return 2
    case '개선':
      return 3
    case '계속/신규':
    case '신규,계속':
    case '신규, 계속':
    case '신규/계속':
    case '확대':
      return 4
    default:
      throw Error(`정의되지 않은 \`startPeriod\`입니다. \`${startPeriod}\``)
  }
}

function getEndPeriodCode(endPeriod) {
  switch (endPeriod) {
    case undefined:
      return null
    case '올해':
      return 0
    case '임기내':
    case '임기 내':
    case '임기 내(착공)':
      return 1
    case '임기 내 착수':
      return 2
    case '임기후':
    case '임기 후':
    case '임기내,임기후':
    case '임기 내,임기 후':
    case '임기 내,임기후':
    case '임기 내, 임기 후':
    case '임기 내/후':
    case '임기내/후':
      return 3
    default:
      throw Error(`정의되지 않은 \`endPeriod\`입니다. \`${endPeriod}\``)
  }
}

function getFinanceCategoryCode(financeCategory) {
  switch (financeCategory) {
    case '비예산':
      return 0
    case '예산':
      return 1
    case '집행':
      return 2
    case '미정':
      return 3
    default:
      throw Error(`정의되지 않은 \`유형\`입니다. ${financeCategory}`)
  }
}

function getMoney(money, unit) {
  if (money === '미정') return null

  return +(money ?? 0) * unit
}
