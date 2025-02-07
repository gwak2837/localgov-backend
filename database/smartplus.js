// yarn node ./database/smartplus.js

import pg from 'pg'

const PGURI = 'postgresql://lofin_admin:LOFpostgres159!@127.0.0.1:54321/lofin?sslmode=disable'
const client = await new pg.Pool({ connectionString: PGURI }).connect()
const { rows } = await client.query('SELECT CURRENT_TIMESTAMP')
console.log(`🚅 Connected to ${PGURI} at ${new Date(rows[0].current_timestamp).toLocaleString()}`)

const smartplus = {
  '구체성(Specific)': [
    '공약의 목표를 구체적으로 제시하고 있는가?',
    '공약의 추진방법을 구체적으로 제시하고 있는가?',
    '공약달성을 위한 현실성 있는 재원조달방안을 제시하고 있는가?',
  ],
  '측정가능성(Measurable)': [
    '공약의 목표 달성 여부나 달성비율 등에 대한 측정이 가능한가?',
    '매년 공약달성 여부를 측정할 수 있도록 목표치를 설정했는가?',
  ],
  '소망성(Aimed)': [
    '공약이 지역의 바람직한 미래상을 담아내고 있는가?',
    '공약 추진방법이 주민들의 갈등을 최소화 할 수 있는 대안인가?',
    '공약이 후보자의 비전이나 독창성을 포함하고 있는가?',
  ],
  '적정성(Relevant)': [
    '공약의 우선순위가 지역현안을 적절히 고려하고 있는가?',
    '제시된 공약이 지역의 현안에 대한 적절한 해결방안인가?',
    '공약이 지역주민들의 욕구를 충분히 담아내고 있는가?',
  ],
  '시간계획성(Timed)': [
    '상대에 대한 비방보다는 자신의 공약을 적극 알리려 하는가?',
    '지역의 현안을 해결하기 위해 적극적으로 노력하고 있는가?',
    '자신의 경력과 능력을 진정성 있게 홍보하고 있는가?',
  ],
  '적극성(Positive)': [
    '상대에 대한 비방보다는 자신의 공약을 적극 알리려 하는가?',
    '지역의 현안을 해결하기 위해 적극적으로 노력하고 있는가?',
    '자신의 경력과 능력을 진정성 있게 홍보하고 있는가?',
  ],
  '리더십(Leadership)': [
    '공약을 실천할 수 있는 리더십을 가지고 있는가?',
    '공약 추진과 관계있는 기관이나 단체 와의 원활한 협력이 가능한가?',
  ],
  '소통(Understanding)': [
    '적절한 수단을 활용하여 지역사회와 소통하고 있는가?',
    '지역사회의 이해 당사자와 소통할 수 있는 능력이 있는가?',
    '자신의 신상정보나 공약, 정견, 경력 등을 충분히 공개하고 있는가?',
  ],
  '전문성(Speciality)': [
    '공약을 실천할 수 있는 전문성을 가지고 있는가?',
    '공약을 추진해 나갈 수 있는 능력과 경력을 갖추고 있는가?',
  ],
}

try {
  await client.query('BEGIN')

  const contents = []
  const categories = []
  const visibilities = []

  let i = 0

  for (const category in smartplus) {
    for (const question of smartplus[category]) {
      contents.push(question)
      categories.push(i)
      visibilities.push(true)
    }
    i++
  }

  const { rowCount } = await client.query(
    `INSERT INTO smartplus_question (
      content,
      category,
      is_visible
    )
    SELECT *
    FROM unnest(
      $1::text [],
      $2::int [],
      $3::boolean []
    );`,
    [contents, categories, visibilities]
  )

  console.log('👀 ~ rowCount:', rowCount)

  await client.query('COMMIT')
} catch (error) {
  await client.query('ROLLBACK')
  throw error
} finally {
  client.release()
}
