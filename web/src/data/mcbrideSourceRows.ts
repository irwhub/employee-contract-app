export type McbrideSourceRow = {
  readonly reference: string;
  readonly level: string;
  readonly condition: string;
  readonly measurement: string;
};

export const mcbrideSourceRows = {
  shoulder: [
    {
      reference: '맥브라이드 견관절 원문-01',
      level: '55%',
      condition: '1. 상지를 몸에 댄 상태에서',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 견관절 원문-02',
      level: '37%',
      condition: '2. 상지의 외전 60도. 굴곡 10도에서',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 견관절 원문-03',
      level: '59%',
      condition: '3. 상지의 외전 80~90도에서',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 견관절 원문-04',
      level: '41%',
      condition: '1. 상지를 몸에 댄 상태에서',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 견관절 원문-05',
      level: '27%',
      condition: '2. 상지의 외전 60도. 굴곡 10도에서',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 견관절 원문-06',
      level: '37%',
      condition: '3. 상지의 외전 80~90도에서',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 견관절 원문-07',
      level: '33%',
      condition: '1. 외전 및 회전 불능, 25도 굴곡 및 신전(운동범위 25도)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 견관절 원문-08',
      level: '28%',
      condition: '2. 25도 외전 및 회전, 50도 굴곡 및 신전(운동범위 50도)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 견관절 원문-09',
      level: '23%',
      condition: '3. 50도 외전 및 회전, 75도 굴곡 및 신전(운동범위 75도)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 견관절 원문-10',
      level: '18%',
      condition: '4. 90도 외전 및 회전, 굴곡 및 신전 정상',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 견관절 원문-11',
      level: '40%',
      condition: '1. 외전 및 회전 불능, 25도 굴곡 및 신전(운동범위 25도)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 견관절 원문-12',
      level: '34%',
      condition: '2. 25도 외전 및 회전, 50도 굴곡 및 신전(운동범위 50도)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 견관절 원문-13',
      level: '27%',
      condition: '3. 50도 외전 및 회전, 75도 굴곡 및 신전(운동범위 75도)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 견관절 원문-14',
      level: '21%',
      condition: '4. 90도 외전 및 회전',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 견관절 원문-15',
      level: '30%',
      condition: 'A. 수술하지 않은 경우',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 견관절 원문-16',
      level: '20%',
      condition: 'B. 수술한 경우',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 견관절 원문-17',
      level: '55%',
      condition: 'Ⅳ. 도리깨같은 견관절(손은 정상) (flail shoulder)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    }
  ],
  elbow: [
    {
      reference: '맥브라이드 주관절 원문-01',
      level: '41%',
      condition: 'A. 완전 신전위에서',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 주관절 원문-02',
      level: '34%',
      condition: 'B. 135도 각위에서',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 주관절 원문-03',
      level: '28%',
      condition: 'C. 90도 각위에서',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 주관절 원문-04',
      level: '33%',
      condition: 'D. 75도 각위에서',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 주관절 원문-05',
      level: '31%',
      condition: 'A. 180도 선에서 135도까지 굴곡(운동범위 45도)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 주관절 원문-06',
      level: '25%',
      condition: 'B. 180도 선에서 110도까지 굴곡(운동범위 70도)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 주관절 원문-07',
      level: '18%',
      condition: 'C. 180도 선에서 90도까지 굴곡(운동범위 90도)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 주관절 원문-08',
      level: '13%',
      condition: 'D. 180도 선에서 75도까지 굴곡(운동범위 105도)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 주관절 원문-09',
      level: '28%',
      condition: 'E. 160도 각위에서 110도까지 굴곡(운동범위 50도)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 주관절 원문-10',
      level: '21%',
      condition: 'F. 160도 각위에서 90도까지 굴곡(운동범위 70도)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 주관절 원문-11',
      level: '22%',
      condition: 'G. 135도 각위에서 90도까지 굴곡(운동범위 45도)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 주관절 원문-12',
      level: '18%',
      condition: 'H. 135도 각위에서 75도까지 굴곡(운동범위 60도)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 주관절 원문-13',
      level: '24%',
      condition: 'I. 110도 각위에서 90도까지 굴곡(운동범위 20도)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 주관절 원문-14',
      level: '23%',
      condition: 'J. 110도 각위에서 75도까지 굴곡(운동범위 35도)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 주관절 원문-15',
      level: '25%',
      condition: 'K. 90도 각위에서 75도까지 굴곡(운동범위 15도)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 주관절 원문-16',
      level: '24%',
      condition: 'L. 90도 각위에서 45도까지 굴곡(운동범위 45도)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    }
  ],
  wrist: [
    {
      reference: '맥브라이드 수관절 원문-01',
      level: '21%',
      condition: 'A. 70도 배굴위(dorsiflexion)에서',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 수관절 원문-02',
      level: '16%',
      condition: 'B. 30도 배굴위에서',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 수관절 원문-03',
      level: '18%',
      condition: 'C. 180도 선에서',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 수관절 원문-04',
      level: '24%',
      condition: 'D. 15도 장측 굴곡위(palmar flexion)에서',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 수관절 원문-05',
      level: '15%',
      condition: 'A. 완전 회외위(full supination)인것',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 수관절 원문-06',
      level: '8%',
      condition: 'B. 반 회외위(semi supination)인것',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 수관절 원문-07',
      level: '14%',
      condition: 'C. 완전 회내위(full pronation)인것',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 수관절 원문-08',
      level: '8%',
      condition: 'D. 반 회내위(semi pronation)인것',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 수관절 원문-09',
      level: '16%',
      condition: '1. 180도 선까지(운동범위 45도)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 수관절 원문-10',
      level: '13%',
      condition: '2. 15도 장측 굴곡위까지(운동범위 60도)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 수관절 원문-11',
      level: '14%',
      condition: '1. 180도 선까지(운동범위 70도)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 수관절 원문-12',
      level: '7%',
      condition: '2. 15도 장측 굴곡위까지(운동범위 80도)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 수관절 원문-13',
      level: '16%',
      condition: '1. 15도 장측 굴곡위까지(운동범위 15도)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 수관절 원문-14',
      level: '17%',
      condition: '2. 30도 장측 굴곡위까지(운동범위 30도)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 수관절 원문-15',
      level: '12%',
      condition: '1. 180도 선까지(운동범위 15도)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 수관절 원문-16',
      level: '5%',
      condition: '2. 15도 외전위까지(운동범위 30도)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 수관절 원문-17',
      level: '7%',
      condition: '1. 180도 선까지(운동범위 10도)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 수관절 원문-18',
      level: '13%',
      condition: '1. 25도 회내위까지(운동범위 115도)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 수관절 원문-19',
      level: '4%',
      condition: '2. 50도 회내위까지(운동범위 140도)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 수관절 원문-20',
      level: '13%',
      condition: '1. 25도 회외위까지(운동범위 115도)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 수관절 원문-21',
      level: '4%',
      condition: '2. 50도 회외위까지(운동범위 140도)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    }
  ],
  thumb: [
    {
      reference: '맥브라이드 무지 원문-01',
      level: '9%',
      condition: 'a. 중위 외전(mid abduction)과 완전 신전위(full extension)에서',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-02',
      level: '8%',
      condition: 'b. 중위 외전과 예형 굴곡위(acute flexion)에서',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-03',
      level: '15%',
      condition: 'c. 완전 외전과 완전 신전위에서',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-04',
      level: '15%',
      condition: 'd. 완전 외전과 예형 굴곡위에서',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-05',
      level: '8%',
      condition: 'a. 중간위(mid position)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-06',
      level: '10%',
      condition: 'b. 완전 굴곡위(full flexion)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-07',
      level: '7%',
      condition: 'a. 중간위(mid position)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-08',
      level: '8%',
      condition: 'b. 완전 신전위(full extension)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-09',
      level: '9%',
      condition: 'a. 중간위(mid position)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-10',
      level: '14%',
      condition: 'b. 완전 신전위(full extension)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-11',
      level: '10%',
      condition: 'a. 중위 외전과 중위 신전위에서',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-12',
      level: '16%',
      condition: 'b. 완전 내전과 완전 신전위에서',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-13',
      level: '17%',
      condition: 'a. 완전 신전과 외전위에서',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-14',
      level: '20%',
      condition: 'b. 완전 굴곡과 내전위에서',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-15',
      level: '8%',
      condition: 'a. 외전. 굴곡(신전은 정상)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-16',
      level: '14%',
      condition: 'b. 내전. 굴곡(신전은 정상)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-17',
      level: '9%',
      condition: 'c. 신전과 내전',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-18',
      level: '8%',
      condition: 'd. 굴곡과 외전',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-19',
      level: '8%',
      condition: 'a. 신전',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-20',
      level: '10%',
      condition: 'b. 굴곡',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-21',
      level: '3%',
      condition: 'a. 신전',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-22',
      level: '3%',
      condition: 'b. 굴곡',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-23',
      level: '8%',
      condition: 'a. 신전',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-24',
      level: '10%',
      condition: 'b. 굴곡',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-25',
      level: '15%',
      condition: 'a. 신전 및 내전',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-26',
      level: '9%',
      condition: 'b. 굴곡, 외전(내전은 정상)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-27',
      level: '14%',
      condition: 'a. 신전과 외전',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-28',
      level: '16%',
      condition: 'b. 굴곡과 내전',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-29',
      level: '14%',
      condition: 'a. 굴곡 및 내전이 25도로 제한',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-30',
      level: '10%',
      condition: 'b. 굴곡 및 내전이 50도로 제한',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-31',
      level: '7%',
      condition: 'c. 굴곡 및 내전이 75도로 제한',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-32',
      level: '16%',
      condition: 'a. 신전 및 외전이 25도로 제한',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-33',
      level: '10%',
      condition: 'b. 신전 및 외전이 50도로 제한',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-34',
      level: '8%',
      condition: 'c. 신전 및 외전이 75도로 제한',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-35',
      level: '8%',
      condition: 'a. 내전이 25도로 제한',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-36',
      level: '7%',
      condition: 'b. 내전이 50도로 제한',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-37',
      level: '3%',
      condition: 'c. 내전이 75도로 제한',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-38',
      level: '14%',
      condition: 'a. 외전이 25도로 제한',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-39',
      level: '7%',
      condition: 'b. 외전이 50도로 제한',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-40',
      level: '7%',
      condition: 'c. 외전이 75도로 제한',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-41',
      level: '9%',
      condition: 'a. 신전 및 내전이 25도로 제한',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-42',
      level: '7%',
      condition: 'b. 신전 및 내전이 50도로 제한',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-43',
      level: '3%',
      condition: 'c. 신전 및 내전이 75도로 제한',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-44',
      level: '8%',
      condition: 'a. 굴곡 및 외전이 25도로 제한',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-45',
      level: '3%',
      condition: 'b. 굴곡 및 외전이 50도로 제한',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-46',
      level: '3%',
      condition: 'c. 굴곡 및 외전이 75도로 제한',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-47',
      level: '10%',
      condition: 'a. 25도 신전까지',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-48',
      level: '8%',
      condition: 'b. 50도 신전까지',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-49',
      level: '6%',
      condition: 'c. 75도 신전까지',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-50',
      level: '8%',
      condition: 'a. 25도 굴곡까지',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-51',
      level: '7%',
      condition: 'b. 50도 굴곡까지',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-52',
      level: '3%',
      condition: 'c. 75도 굴곡까지',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-53',
      level: '3%',
      condition: 'a. 25도 신전까지',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-54',
      level: '3%',
      condition: 'b. 50도 신전까지',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-55',
      level: '3%',
      condition: 'c. 75도 신전까지',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-56',
      level: '3%',
      condition: 'a. 25도 굴곡까지',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-57',
      level: '3%',
      condition: 'b. 50도 굴곡까지',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-58',
      level: '3%',
      condition: 'c. 75도 굴곡까지',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-59',
      level: '8%',
      condition: 'a. 완전 무감각',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-60',
      level: '6%',
      condition: 'b. 감각 저하',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-61',
      level: '8%',
      condition: '2. 피하지방수질의 압좌(crushed fatty pulp)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 무지 원문-62',
      level: '8%',
      condition: '3. 깊은 유착성 반흔',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    }
  ],
  finger: [
    {
      reference: '맥브라이드 손가락 원문-01',
      level: '11%',
      condition: '1. 중간위(mid position)에서',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 손가락 원문-02',
      level: '11%',
      condition: '2. 완전 신전위(full extension)에서',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 손가락 원문-03',
      level: '7%',
      condition: '1. 중간위(mid position)에서',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 손가락 원문-04',
      level: '10%',
      condition: '2. 완전 신전위(full extension)에서',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 손가락 원문-05',
      level: '5%',
      condition: '1. 중간위(mid position)에서',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 손가락 원문-06',
      level: '5%',
      condition: '2. 완전 신전위(full extension)에서',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 손가락 원문-07',
      level: '7%',
      condition: '1. 중간위(mid position)에서',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 손가락 원문-08',
      level: '12%',
      condition: '2. 완전 신전위(full extension)에서',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 손가락 원문-09',
      level: '14%',
      condition: '1. 중간위(mid position)에서',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 손가락 원문-10',
      level: '14%',
      condition: '2. 완전 신전위(full extension)에서',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 손가락 원문-11',
      level: '10%',
      condition: '1. 손바닥 손가락뼈 관절의 굴곡',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 손가락 원문-12',
      level: '10%',
      condition: '2. 손바닥 손가락뼈 관절의 신전',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 손가락 원문-13',
      level: '5%',
      condition: '3. 중간 손가락뼈 관절의 굴곡',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 손가락 원문-14',
      level: '9%',
      condition: '4. 중간 손가락뼈 관절의 신전',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 손가락 원문-15',
      level: '5%',
      condition: '5. 원위 손가락뼈 관절의 굴곡',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 손가락 원문-16',
      level: '5%',
      condition: '6. 원위 손가락뼈 관절의 신전',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 손가락 원문-17',
      level: '12%',
      condition: '7. 원위 및 중간 손가락뼈사이 및 손바닥 손가락뼈사이 관절의 굴곡',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 손가락 원문-18',
      level: '14%',
      condition: '8. 원위 및 중간 손가락뼈사이 및 손바닥 손가락뼈사이 관절의 신전',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 손가락 원문-19',
      level: '5%',
      condition: '9. 원위 및 중간 손가락뼈사이 관절의 굴곡',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 손가락 원문-20',
      level: '10%',
      condition: '10. 원위 및 중간 손가락뼈사이 관절의 신전',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 손가락 원문-21',
      level: '12%',
      condition: '1. 25도 신전까지',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 손가락 원문-22',
      level: '5%',
      condition: '2. 50도 신전까지',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 손가락 원문-23',
      level: '5%',
      condition: '3. 75도 신전까지',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 손가락 원문-24',
      level: '14%',
      condition: '1. 25도 굴곡까지',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 손가락 원문-25',
      level: '9%',
      condition: '2. 50도 굴곡까지',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 손가락 원문-26',
      level: '7%',
      condition: '3. 75도 굴곡까지',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 손가락 원문-27',
      level: '14%',
      condition: '1. 25도 신전 가능',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 손가락 원문-28',
      level: '10%',
      condition: '2. 50도 신전 가능',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 손가락 원문-29',
      level: '3%',
      condition: '3. 75도 신전 가능',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 손가락 원문-30',
      level: '12%',
      condition: '1. 25도 굴곡 가능',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 손가락 원문-31',
      level: '10%',
      condition: '2. 50도 굴곡 가능',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 손가락 원문-32',
      level: '5%',
      condition: '3. 75도 굴곡 가능',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 손가락 원문-33',
      level: '12%',
      condition: '1. 25도 신전 가능',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 손가락 원문-34',
      level: '5%',
      condition: '2. 50도 신전 가능',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 손가락 원문-35',
      level: '2%',
      condition: '3. 75도 신전 가능',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 손가락 원문-36',
      level: '9%',
      condition: '1. 25도 굴곡 가능',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 손가락 원문-37',
      level: '7%',
      condition: '2. 50도 굴곡 가능',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 손가락 원문-38',
      level: '5%',
      condition: '3. 75도 굴곡 가능',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 손가락 원문-39',
      level: '3%',
      condition: '1. 25도 신전 가능',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 손가락 원문-40',
      level: '2%',
      condition: '2. 50도 신전 가능',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 손가락 원문-41',
      level: '1%',
      condition: '3. 75도 신전 가능',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 손가락 원문-42',
      level: '5%',
      condition: '1. 25도 굴곡 가능',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 손가락 원문-43',
      level: '2%',
      condition: '2. 50도 굴곡 가능',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 손가락 원문-44',
      level: '2%',
      condition: '3. 75도 굴곡 가능',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 손가락 원문-45',
      level: '8%',
      condition: 'a. 완전 무감각',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 손가락 원문-46',
      level: '5%',
      condition: 'b. 감각 저하',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 손가락 원문-47',
      level: '5%',
      condition: '2. 피하지방수질의 압좌(crushed fatty pulp)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 손가락 원문-48',
      level: '5%',
      condition: '3. 깊은 유착성 반흔',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    }
  ],
  hip: [
    {
      reference: '맥브라이드 고관절 원문-01',
      level: '24%',
      condition: '1. 25도 굴곡상태에서',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 고관절 원문-02',
      level: '43%',
      condition: '2. 70도 굴곡상태에서',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 고관절 원문-03',
      level: '31%',
      condition: '3. 180도의 완전 신전상태에서',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 고관절 원문-04',
      level: '27%',
      condition: '4. 25도 외전의 완전 신전상태에서',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 고관절 원문-05',
      level: '32%',
      condition: '5. 25도 내전의 완전 신전상태에서',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 고관절 원문-06',
      level: '22%',
      condition: '6. 25도 외전, 25도 굴곡상태에서',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 고관절 원문-07',
      level: '44%',
      condition: '7. 25도 외전, 70도 굴곡상태에서',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 고관절 원문-08',
      level: '24%',
      condition: '8. 25도 내전, 25도 굴곡상태에서',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 고관절 원문-09',
      level: '45%',
      condition: '9. 25도 내전, 70도 굴곡상태에서',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 고관절 원문-10',
      level: '9%',
      condition: '1. 90도 굴곡에서 180도 선까지(운동범위 90도)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 고관절 원문-11',
      level: '12%',
      condition: '2. 45도 굴곡에서 180도 선까지(운동범위 45도)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 고관절 원문-12',
      level: '21%',
      condition: '3. 25도 굴곡에서 180도 선까지(운동범위 25도)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 고관절 원문-13',
      level: '7%',
      condition: '1. 25도 외전에서 15도 내전까지(운동범위 40도)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 고관절 원문-14',
      level: '9%',
      condition: '2. 25도 외전에서 180도 선까지(운동범위 25도)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 고관절 원문-15',
      level: '13%',
      condition: '3. 25도 내전에서 15도 외전까지(운동범위 40도)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 고관절 원문-16',
      level: '10%',
      condition: '1. 15도 내회전(internal rotation)에서 180도 선까지 (운동범위 15도)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 고관절 원문-17',
      level: '9%',
      condition: '2. 15도 내회전에서 25도 외회전(external rotation)까지 (운동범위 40도)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 고관절 원문-18',
      level: '9%',
      condition: '3. 180도 선에서 20도 외회전까지(운동범위 20도)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 고관절 원문-19',
      level: '7%',
      condition: '4. 180도 선에서 30도 외회전까지(운동범위 30도)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 고관절 원문-20',
      level: '14%',
      condition: 'D. 동통이 없는 인공관절치환술(prosthesis)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 고관절 원문-21',
      level: '39%',
      condition: 'E. 불유합(nonunion). 관절재건술을 시행치 않은 무균성 괴사 (aseptic necrosis)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    }
  ],
  knee: [
    {
      reference: '맥브라이드 슬관절 원문-01',
      level: '30%',
      condition: '1. 완전 신전위에서',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 슬관절 원문-02',
      level: '30%',
      condition: '2. 160도 각위에서',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 슬관절 원문-03',
      level: '46%',
      condition: '3. 90도 각위에서',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 슬관절 원문-04',
      level: '21%',
      condition: '1. 180도 선에서 45도까지 굴곡(운동범위 45도)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 슬관절 원문-05',
      level: '12%',
      condition: '2. 180도 선에서 90도까지 굴곡(운동범위 90도)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 슬관절 원문-06',
      level: '7%',
      condition: '3. 180도 선에서 110도까지 굴곡(운동범위 110도)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 슬관절 원문-07',
      level: '24%',
      condition: '4. 160도 각위에서 90도까지 굴곡(운동범위 70도)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 슬관절 원문-08',
      level: '22%',
      condition: '5. 160도 각위에서 45도까지 굴곡(운동범위 115도)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 슬관절 원문-09',
      level: '12%',
      condition: '1. 간헐적 잠김현상(occasional locking):수술하지 않은 경우',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 슬관절 원문-10',
      level: '6%',
      condition: '2. 연골절제하여 기능을 충분히 회복한 경우',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 슬관절 원문-11',
      level: '25%',
      condition: '1. 동요가 있으나 수술하지 않은 경우',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 슬관절 원문-12',
      level: '21%',
      condition: '1. 신전운동 75% 약해짐',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 슬관절 원문-13',
      level: '12%',
      condition: '1. 보존적 치료 : 강직정도에 따라 평가',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 슬관절 원문-14',
      level: '12%',
      condition: '2. 적출한 경우 : 강직정도에 따라 평가',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    }
  ],
  ankle: [
    {
      reference: '맥브라이드 족관절 원문-01',
      level: '23%',
      condition: '1. 90도 각위에서',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 족관절 원문-02',
      level: '32%',
      condition: '2. 125도 각위에서',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 족관절 원문-03',
      level: '19%',
      condition: 'a. 105도 저측굴곡(plantar flexion)까지(운동범위 15도)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 족관절 원문-04',
      level: '10%',
      condition: 'b. 125도 저측굴곡까지(운동범위 35도)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 족관절 원문-05',
      level: '19%',
      condition: 'a. 125도 저측굴곡까지(운동범위 20도)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 족관절 원문-06',
      level: '32%',
      condition: 'a. 135도 저측굴곡까지(운동범위 20도)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 족관절 원문-07',
      level: '9%',
      condition: 'a. 180도 선까지(운동범위 20도)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 족관절 원문-08',
      level: '7%',
      condition: 'b. 10도 외반(eversion) 및 외전까지(운동범위 30도)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 족관절 원문-09',
      level: '9%',
      condition: 'a. 10도 외반 및 외전까지(운동범위 10도)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 족관절 원문-10',
      level: '10%',
      condition: '1. 10도',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 족관절 원문-11',
      level: '11%',
      condition: '2. 20도',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 족관절 원문-12',
      level: '10%',
      condition: '1. 10도',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 족관절 원문-13',
      level: '10%',
      condition: '2. 20도',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 족관절 원문-14',
      level: '13%',
      condition: '3. 30도',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    }
  ],
  toe: [
    {
      reference: '맥브라이드 발가락 원문-01',
      level: '6%',
      condition: '1. 180도 선에서',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 발가락 원문-02',
      level: '6%',
      condition: '2. 20도 배측굴곡상태에서',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 발가락 원문-03',
      level: '7%',
      condition: '3. 20도 저측굴곡상태에서',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 발가락 원문-04',
      level: '2%',
      condition: '1. 180도 선에서',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 발가락 원문-05',
      level: '4%',
      condition: '2. 20도 저측굴곡상태에서',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 발가락 원문-06',
      level: '6%',
      condition: 'c. 두 관절의 추상지(hammer toe)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 발가락 원문-07',
      level: '1%',
      condition: 'a. 정상 위치(natural position)에서',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 발가락 원문-08',
      level: '1%',
      condition: 'b. 추상지(hammer toe)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 발가락 원문-09',
      level: '1%',
      condition: 'c. 중첩 위치(overriding position)에서',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 발가락 원문-10',
      level: '3%',
      condition: '1. 15도 신전에서 180도 선까지',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 발가락 원문-11',
      level: '6%',
      condition: '2. 180도 선에서 10도 굴곡까지',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 발가락 원문-12',
      level: '4%',
      condition: '3. 180도 선에서 35도 굴곡까지',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 발가락 원문-13',
      level: '3%',
      condition: '1. 180도 선에서 15도 굴곡까지',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 발가락 원문-14',
      level: '4%',
      condition: '1. 추상지에 이른 것',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 발가락 원문-15',
      level: '6%',
      condition: '2. 무지 외반증(hallux valgus)에 이른 것',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 발가락 원문-16',
      level: '1%',
      condition: '1. 추상지에 이른 것',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 발가락 원문-17',
      level: '1%',
      condition: '2. 중첩지에 이른 것',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 발가락 원문-18',
      level: '1%',
      condition: '3. 저굴변형에 이른 것',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    }
  ],
  clavicle: [
    {
      reference: '맥브라이드 쇄골 원문-01',
      level: '9%',
      condition: '1. 15도에서 20도',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 쇄골 원문-02',
      level: '12%',
      condition: '1. 순환압박 : 주관적 증상 뿐일 때',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 쇄골 원문-03',
      level: '17%',
      condition: '2. 순환압박 : 종창을 동반한 경우',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 쇄골 원문-04',
      level: '11%',
      condition: '1. 90% 경직도(rigidity)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 쇄골 원문-05',
      level: '18%',
      condition: '2. 50% 경직도',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 쇄골 원문-06',
      level: '22%',
      condition: '3. 10% 경직도',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 쇄골 원문-07',
      level: '11%',
      condition: 'Ⅳ. 골절 또는 흉쇄관절(sternoclavicular joint)의 탈구 : 이 완관절(relaxed joint)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 쇄골 원문-08',
      level: '11%',
      condition: 'Ⅴ. 골절 또는 흉쇄인대(sternoclavicular ligament)의 파열 : 이완관절(relaxed joint)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 쇄골 원문-09',
      level: '16%',
      condition: 'Ⅵ. 외상성 관절염(traumatic arthritis)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    }
  ],
  scapula: [
    {
      reference: '맥브라이드 견갑골 원문-01',
      level: '10%',
      condition: '1. 10도',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 견갑골 원문-02',
      level: '17%',
      condition: '2. 25도',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 견갑골 원문-03',
      level: '12%',
      condition: '1. 10도',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 견갑골 원문-04',
      level: '17%',
      condition: '2. 25도',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 견갑골 원문-05',
      level: '11%',
      condition: 'Ⅳ. 견갑극의 골절 : 심한 변형(fracture of spine : severe deformity)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 견갑골 원문-06',
      level: '17%',
      condition: '1. 불유합(nonunoin)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 견갑골 원문-07',
      level: '17%',
      condition: '2. 25도 각도 형성',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 견갑골 원문-08',
      level: '17%',
      condition: 'Ⅵ. 오구인대 파열(coracoid ligament)로 상완골 하방전위 (downward displacement of humerus)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    }
  ],
  humerus: [
    {
      reference: '맥브라이드 상완골 원문-01',
      level: '9%',
      condition: '1. 10도',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 상완골 원문-02',
      level: '13%',
      condition: '2. 20도',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 상완골 원문-03',
      level: '24%',
      condition: '3. 45도',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 상완골 원문-04',
      level: '8%',
      condition: '1. 10도',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 상완골 원문-05',
      level: '13%',
      condition: '2. 20도',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 상완골 원문-06',
      level: '30%',
      condition: '3. 45도',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 상완골 원문-07',
      level: '12%',
      condition: '1. 10도',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 상완골 원문-08',
      level: '19%',
      condition: '2. 20도',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 상완골 원문-09',
      level: '32%',
      condition: '3. 45도',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 상완골 원문-10',
      level: '11%',
      condition: 'D. 과부 - 정복이 안된 상태',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 상완골 원문-11',
      level: '8%',
      condition: '1. 1/2인치',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 상완골 원문-12',
      level: '11%',
      condition: '2. 1인치(2. 54cm)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 상완골 원문-13',
      level: '6%',
      condition: '1. 1/2인치',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 상완골 원문-14',
      level: '12%',
      condition: '2. 1인치(2. 54cm)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 상완골 원문-15',
      level: '20%',
      condition: '3. 2인치',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 상완골 원문-16',
      level: '11%',
      condition: '1. 1/2인치',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 상완골 원문-17',
      level: '17%',
      condition: '2. 1인치(2. 54cm)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 상완골 원문-18',
      level: '24%',
      condition: '3. 2인치',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 상완골 원문-19',
      level: '36%',
      condition: '1. 75% 경직도',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 상완골 원문-20',
      level: '47%',
      condition: '2. 50% 경직도',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 상완골 원문-21',
      level: '57%',
      condition: '3. 10% 경직도',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    }
  ],
  forearm: [
    {
      reference: '맥브라이드 전완부·손 원문-01',
      level: '17%',
      condition: 'a. 약한 유합 (weak union)- 섬유성(fibrous)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 전완부·손 원문-02',
      level: '31%',
      condition: 'b. 불유합 - 경직도 없음',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 전완부·손 원문-03',
      level: '13%',
      condition: '2. 요골 골두 절제(head of radius execised)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 전완부·손 원문-04',
      level: '13%',
      condition: 'a. 상 1/3부',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 전완부·손 원문-05',
      level: '9%',
      condition: 'b. 중 1/3부',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 전완부·손 원문-06',
      level: '13%',
      condition: 'c. 하 1/3부',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 전완부·손 원문-07',
      level: '18%',
      condition: 'a. 상 1/3부',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 전완부·손 원문-08',
      level: '11%',
      condition: 'b. 중 1/3부',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 전완부·손 원문-09',
      level: '6%',
      condition: 'c. 하 1/3부',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 전완부·손 원문-10',
      level: '18%',
      condition: 'a. 상 1/3부',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 전완부·손 원문-11',
      level: '13%',
      condition: 'b. 중 1/3부',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 전완부·손 원문-12',
      level: '13%',
      condition: 'c. 하 1/3부',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 전완부·손 원문-13',
      level: '20%',
      condition: 'a. 상 1/3부',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 전완부·손 원문-14',
      level: '18%',
      condition: 'b. 중 1/3부',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 전완부·손 원문-15',
      level: '18%',
      condition: 'c. 하 1/3부',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 전완부·손 원문-16',
      level: '9%',
      condition: '2. 요골 및 척골 모두 1인치',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 전완부·손 원문-17',
      level: '18%',
      condition: '3. 요골 및 척골 모두 2인치',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 전완부·손 원문-18',
      level: '17%',
      condition: 'a. 요골',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 전완부·손 원문-19',
      level: '19%',
      condition: 'b. 척골',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 전완부·손 원문-20',
      level: '20%',
      condition: 'a. 요골',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 전완부·손 원문-21',
      level: '24%',
      condition: 'b. 척골',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 전완부·손 원문-22',
      level: '26%',
      condition: 'c. 요골 및 척골 모두',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 전완부·손 원문-23',
      level: '39%',
      condition: 'a. 요골',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 전완부·손 원문-24',
      level: '41%',
      condition: 'b. 척골',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 전완부·손 원문-25',
      level: '42%',
      condition: 'c. 요골 및 척골 모두',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    }
  ],
  wristHand: [
    {
      reference: '맥브라이드 수관절·손 원문-01',
      level: '9%',
      condition: 'a. 부정 유합(불량 유합. malunion)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 수관절·손 원문-02',
      level: '18%',
      condition: 'b. 불유합(nonunion)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 수관절·손 원문-03',
      level: '8%',
      condition: 'a. 부정 유합(불량 유합)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 수관절·손 원문-04',
      level: '6%',
      condition: 'Ⅲ. 기타 손목뼈 골절',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 수관절·손 원문-05',
      level: '8%',
      condition: 'a. 10도 각도 형성',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 수관절·손 원문-06',
      level: '9%',
      condition: 'b. 20도 각도 형성',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 수관절·손 원문-07',
      level: '8%',
      condition: 'a. 경부에 10도 각도 형성',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 수관절·손 원문-08',
      level: '9%',
      condition: 'b. 간부에 10도 각도 형성',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 수관절·손 원문-09',
      level: '11%',
      condition: 'c. 기저부(base)에 10도 각도 형성',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    }
  ],
  fingerFracture: [
    {
      reference: '맥브라이드 손가락 골절 원문-01',
      level: '3%',
      condition: 'a. 10도 각도 형성',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 손가락 골절 원문-02',
      level: '5%',
      condition: 'b. 20도 각도 형성',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 손가락 골절 원문-03',
      level: '1%',
      condition: 'a. 10도 각도 형성',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 손가락 골절 원문-04',
      level: '3%',
      condition: 'b. 20도 각도 형성',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 손가락 골절 원문-05',
      level: '3%',
      condition: 'a. 10도 각도 형성',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 손가락 골절 원문-06',
      level: '5%',
      condition: 'b. 20도 각도 형성',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 손가락 골절 원문-07',
      level: '3%',
      condition: 'a. 10도 각도 형성',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 손가락 골절 원문-08',
      level: '5%',
      condition: 'b. 20도 각도 형성',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 손가락 골절 원문-09',
      level: '1%',
      condition: 'a. 압좌 변형(crushing deformity)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 손가락 골절 원문-10',
      level: '0%',
      condition: 'b. 분절 또는 변형된 손톱(split or deformed nail)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    }
  ],
  pelvis: [
    {
      reference: '맥브라이드 골반 원문-01',
      level: '5%',
      condition: '1. 편측 지(ramus)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 골반 원문-02',
      level: '11%',
      condition: '2. 양측 지(ramus)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 골반 원문-03',
      level: '5%',
      condition: '3. 장골 익(wing)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 골반 원문-04',
      level: '27%',
      condition: '4. 무명골 전체가 1인치 전위',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 골반 원문-05',
      level: '20%',
      condition: '5. 치골결합부 전위(symphysis pubis displaced)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 골반 원문-06',
      level: '27%',
      condition: '2. 천장관절(sacroiliac joint)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    }
  ],
  femur: [
    {
      reference: '맥브라이드 대퇴골 원문-01',
      level: '5%',
      condition: 'a. 10도 내전 변형(adduction deformity)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 대퇴골 원문-02',
      level: '10%',
      condition: 'b. 25도 내전 변형',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 대퇴골 원문-03',
      level: '10%',
      condition: 'c. 10도 외전 변형(abduction deformity)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 대퇴골 원문-04',
      level: '12%',
      condition: 'd. 25도 외전 변형',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 대퇴골 원문-05',
      level: '6%',
      condition: 'e. 25도 외반 변형(eversion deformity)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 대퇴골 원문-06',
      level: '5%',
      condition: 'f. 25도 내반 변형(inversion deformity)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 대퇴골 원문-07',
      level: '5%',
      condition: 'g. 15도 굴곡 변형(flexion deformity)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 대퇴골 원문-08',
      level: '10%',
      condition: 'h. 25도 굴곡 변형',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 대퇴골 원문-09',
      level: '11%',
      condition: 'a. 10도 각도 형성',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 대퇴골 원문-10',
      level: '12%',
      condition: 'b. 25도 각도 형성',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 대퇴골 원문-11',
      level: '20%',
      condition: 'c. 45도 각도 형성',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 대퇴골 원문-12',
      level: '12%',
      condition: 'a. 10도 내측 만곡(knock knee)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 대퇴골 원문-13',
      level: '14%',
      condition: 'b. 25도 내측 만곡',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 대퇴골 원문-14',
      level: '6%',
      condition: 'c. 10도 외측 만곡(bowleg)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 대퇴골 원문-15',
      level: '11%',
      condition: 'd. 25도 외측 만곡',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 대퇴골 원문-16',
      level: '13%',
      condition: 'e. 15도 굴곡 변형(flexion deformity)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 대퇴골 원문-17',
      level: '15%',
      condition: 'f. 15도 과신전 변형',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 대퇴골 원문-18',
      level: '3%',
      condition: 'a. 1/2인치',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 대퇴골 원문-19',
      level: '10%',
      condition: 'b. 1인치(2.54cm)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 대퇴골 원문-20',
      level: '11%',
      condition: 'c. 1 1/2인치',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 대퇴골 원문-21',
      level: '14%',
      condition: 'd. 2인치',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 대퇴골 원문-22',
      level: '25%',
      condition: 'e. 3인치',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 대퇴골 원문-23',
      level: '36%',
      condition: 'a. 75% 안정도(stability)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 대퇴골 원문-24',
      level: '38%',
      condition: 'b. 50% 안정도',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 대퇴골 원문-25',
      level: '47%',
      condition: 'c. 10% 안정도',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 대퇴골 원문-26',
      level: '37%',
      condition: 'a. 75% 안정도(stability)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 대퇴골 원문-27',
      level: '48%',
      condition: 'b. 50% 안정도',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 대퇴골 원문-28',
      level: '49%',
      condition: 'c. 10% 안정도',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    }
  ],
  tibiaFibula: [
    {
      reference: '맥브라이드 경골·비골 원문-01',
      level: '11%',
      condition: 'a. 10-15도 내측 만곡(knock knee)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 경골·비골 원문-02',
      level: '8%',
      condition: 'b. 10-15도 외측 만곡(bow leg)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 경골·비골 원문-03',
      level: '16%',
      condition: 'c. 10-15도 후방 만곡(posterior bowing)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 경골·비골 원문-04',
      level: '9%',
      condition: 'd. 10-15도 전방 만곡(anterior bowing)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 경골·비골 원문-05',
      level: '15%',
      condition: 'e. 20-30도 내측 만곡',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 경골·비골 원문-06',
      level: '11%',
      condition: 'f. 20-30도 외측 만곡',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 경골·비골 원문-07',
      level: '18%',
      condition: 'g. 20-30도 후방 만곡',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 경골·비골 원문-08',
      level: '14%',
      condition: 'h. 20-30도 전방 만곡',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 경골·비골 원문-09',
      level: '7%',
      condition: 'a. 10-15도 전향 만곡(forward bowing)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 경골·비골 원문-10',
      level: '9%',
      condition: 'b. 10-15도 후향 만곡(backward bowing)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 경골·비골 원문-11',
      level: '8%',
      condition: 'c. 10-15도 외향 만곡(outward bowing)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 경골·비골 원문-12',
      level: '9%',
      condition: 'd. 10-15도 내향 만곡(inward bowing)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 경골·비골 원문-13',
      level: '9%',
      condition: 'e. 20-30도 전향 만곡',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 경골·비골 원문-14',
      level: '16%',
      condition: 'f. 20-30도 후향 만곡',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 경골·비골 원문-15',
      level: '11%',
      condition: 'g. 20-30도 외향 만곡',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 경골·비골 원문-16',
      level: '15%',
      condition: 'h. 20-30도 내향 만곡',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 경골·비골 원문-17',
      level: '8%',
      condition: 'a. 10-15도 내반(inversion)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 경골·비골 원문-18',
      level: '11%',
      condition: 'b. 10-15도 외반(eversion)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 경골·비골 원문-19',
      level: '9%',
      condition: 'c. 10-15도 후방 만곡',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 경골·비골 원문-20',
      level: '8%',
      condition: 'd. 10-15도 전방 만곡',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 경골·비골 원문-21',
      level: '9%',
      condition: 'e. 20-30도 내반',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 경골·비골 원문-22',
      level: '16%',
      condition: 'f. 20-30도 외반',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 경골·비골 원문-23',
      level: '14%',
      condition: 'g. 20-30도 후방 만곡',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 경골·비골 원문-24',
      level: '11%',
      condition: 'h. 20-30도 전방 만곡',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 경골·비골 원문-25',
      level: '4%',
      condition: 'a. 1인치',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 경골·비골 원문-26',
      level: '6%',
      condition: 'b. 1 1/2인치',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 경골·비골 원문-27',
      level: '15%',
      condition: 'c. 2인치',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 경골·비골 원문-28',
      level: '22%',
      condition: 'd. 3인치',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 경골·비골 원문-29',
      level: '17%',
      condition: 'a. 75% 경직도(rigidity)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 경골·비골 원문-30',
      level: '22%',
      condition: 'b. 50% 경직도',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 경골·비골 원문-31',
      level: '33%',
      condition: 'c. 10% 경직도',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 경골·비골 원문-32',
      level: '8%',
      condition: '1. 무릎관절내 골절',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 경골·비골 원문-33',
      level: '9%',
      condition: '2. 발목관절내 골절',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 경골·비골 원문-34',
      level: '5%',
      condition: '3. 경비골 유합증(synostosis)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    }
  ],
  footFracture: [
    {
      reference: '맥브라이드 족부 골절 원문-01',
      level: '15%',
      condition: 'a. 부정유합(불량유합. malunion)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 족부 골절 원문-02',
      level: '14%',
      condition: 'b. 잘 정복된 분쇄골절',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 족부 골절 원문-03',
      level: '13%',
      condition: 'c. 완전 유합된 관절고정술(arthrodesis)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 족부 골절 원문-04',
      level: '13%',
      condition: 'a. 부정유합(불량유합)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 족부 골절 원문-05',
      level: '9%',
      condition: 'b. 전위가 적으나 심한 골절',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 족부 골절 원문-06',
      level: '6%',
      condition: 'a. 부정유합(불량유합)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 족부 골절 원문-07',
      level: '6%',
      condition: 'b. 관절고정술 시행',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 족부 골절 원문-08',
      level: '4%',
      condition: 'a. 중족골 머리(head)에 10도 각도 형성',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 족부 골절 원문-09',
      level: '6%',
      condition: 'b. 중족골 머리에 20도 각도 형성',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    }
  ],
  spine: [
    {
      reference: '맥브라이드 척추손상 원문-01',
      level: '27%',
      condition: 'a. 경추부',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-02',
      level: '27%',
      condition: 'b. 흉추부(제 10흉추 이상)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-03',
      level: '32%',
      condition: 'c. 배요부',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-04',
      level: '29%',
      condition: 'd. 요추부',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-05',
      level: '23%',
      condition: 'a. 경추부',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-06',
      level: '14%',
      condition: 'b. 흉추부(제 10흉추 이상)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-07',
      level: '26%',
      condition: 'c. 배요부',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-08',
      level: '27%',
      condition: 'd. 요추부 : 요추전방전위증',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-09',
      level: '18%',
      condition: 'a. 경추부',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-10',
      level: '23%',
      condition: 'b. 흉추부(제 10흉추 이상)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-11',
      level: '26%',
      condition: 'c. 배요부',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-12',
      level: '24%',
      condition: 'd. 요추부',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-13',
      level: '36%',
      condition: 'a. 경추부',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-14',
      level: '36%',
      condition: 'b. 흉추부(제 10흉추 이상)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-15',
      level: '45%',
      condition: 'c. 배요부',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-16',
      level: '45%',
      condition: 'd. 요추부 : 요추전방전위증',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-17',
      level: '29%',
      condition: 'a. 경추부',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-18',
      level: '26%',
      condition: 'b. 흉추부(제 10흉추 이상)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-19',
      level: '34%',
      condition: 'c. 배요부',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-20',
      level: '35%',
      condition: 'd. 요추부',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-21',
      level: '26%',
      condition: 'a. 경추부',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-22',
      level: '27%',
      condition: 'b. 흉추부(제 10흉추 이상)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-23',
      level: '31%',
      condition: 'c. 배요부',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-24',
      level: '29%',
      condition: 'd. 요추부 : 요추전방전위증',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-25',
      level: '57%',
      condition: 'a. 경추부',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-26',
      level: '55%',
      condition: 'b. 흉추부(제 10흉추 이상)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-27',
      level: '73%',
      condition: 'c. 배요부',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-28',
      level: '73%',
      condition: 'd. 요추부 : 요추전방전위증',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-29',
      level: '43%',
      condition: 'a. 경추부',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-30',
      level: '42%',
      condition: 'b. 흉추부(제 10흉추 이상)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-31',
      level: '53%',
      condition: 'c. 배요부',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-32',
      level: '50%',
      condition: 'd. 요추부',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-33',
      level: '35%',
      condition: 'a. 경추부',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-34',
      level: '36%',
      condition: 'b. 흉추부(제 10흉추 이상)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-35',
      level: '41%',
      condition: 'c. 배요부',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-36',
      level: '40%',
      condition: 'd. 요추부 : 요추전방전위증',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-37',
      level: '14%',
      condition: 'a. 경추부',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-38',
      level: '14%',
      condition: 'b. 흉추부(제 10흉추 이상)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-39',
      level: '24%',
      condition: 'c. 요추부',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-40',
      level: '24%',
      condition: 'd. 요천부',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-41',
      level: '29%',
      condition: 'e. 천장부',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-42',
      level: '25%',
      condition: 'a. 경추부',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-43',
      level: '25%',
      condition: 'b. 흉추부(제 10흉추 이상)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-44',
      level: '30%',
      condition: 'c. 요추부',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-45',
      level: '30%',
      condition: 'd. 천장부',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-46',
      level: '23%',
      condition: 'a. 재발하는 중등도의 발작 : 견인, 안정, 고정으로 완화되는',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-47',
      level: '30%',
      condition: 'c. 수술하지 않은 경우',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-48',
      level: '23%',
      condition: 'A. 신경학적 소견이 Ⅹ선 검사로 확인되고 반복적 동통이 안 정 또는 견인, 고정으로 완화됨',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-49',
      level: '30%',
      condition: 'B. 중증 : 수술이 불가피한 것',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-50',
      level: '24%',
      condition: 'b. 6개월 후에 완고한 요천부 동통 재발. 무거운 물건 들 면 증상악화. 중노동 불가',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-51',
      level: '35%',
      condition: 'c. 6개월 후에 완고한 요천부 동통 재발. 직업 변경 필요',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-52',
      level: '14%',
      condition: 'a. 척추유합술후 6개월 시점에서 Ⅹ선 소견으로 유합된 것으로서 운동장해 증상이 없는 경우',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-53',
      level: '24%',
      condition: 'b. 요추 제4-5 유합술후 6개월 시점에서 Ⅹ선 소견으로 유합된 것으로서 운동장해 증상이 없는 경우',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-54',
      level: '33%',
      condition: 'c. 요추4-5, 요추5-천추1의 가관절 : 수술하지 않고 노동 을 계속 하는 경우(증상이 경도인 것)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-55',
      level: '43%',
      condition: 'd. 요추4-5, 요추5-천추1의 가관절 : 증상이 중증. 간헐 적인 기능 전폐(또는 가능한 노무가 극히 제한된 것)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-56',
      level: '64%',
      condition: 'a. 정상 직립자세',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-57',
      level: '70%',
      condition: 'b. 예각 형성(acute angulation)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-58',
      level: '67%',
      condition: 'a. 정상 직립자세',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-59',
      level: '73%',
      condition: 'b. 예각 형성(acute angulation)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-60',
      level: '76%',
      condition: 'a. 정상 직립자세',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-61',
      level: '78%',
      condition: 'b. 예각 형성(acute angulation)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-62',
      level: '84%',
      condition: 'a. 정상 직립자세',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-63',
      level: '94%',
      condition: 'b. 예각 형성(acute angulation)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-64',
      level: '35%',
      condition: '1. 경추부',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-65',
      level: '36%',
      condition: '2. 흉추부(제10흉추이상)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-66',
      level: '43%',
      condition: '3. 요추부',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-67',
      level: '39%',
      condition: '4. 요천부',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-68',
      level: '39%',
      condition: '5. 장요부',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-69',
      level: '43%',
      condition: '1. 경추부',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-70',
      level: '43%',
      condition: '2. 흉추부(제10흉추이상)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-71',
      level: '54%',
      condition: '3. 요추부',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-72',
      level: '53%',
      condition: '4. 요천부',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-73',
      level: '60%',
      condition: '1. 경추부',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-74',
      level: '57%',
      condition: '2. 흉추부(제10흉추이상)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-75',
      level: '75%',
      condition: '3. 요추부',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-76',
      level: '74%',
      condition: '4. 요천부',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 척추손상 원문-77',
      level: '74%',
      condition: '5. 장요부',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    }
  ],
  peripheralNerve: [
    {
      reference: '맥브라이드 말초신경 원문-01',
      level: '39%',
      condition: 'a. 운동 및 지각의 부전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-02',
      level: '55%',
      condition: 'b. 운동 및 지각의 완전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-03',
      level: '35%',
      condition: 'a. 운동 및 지각의 부전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-04',
      level: '52%',
      condition: 'b. 운동 및 지각의 완전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-05',
      level: '35%',
      condition: 'a. 운동 및 지각의 부전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-06',
      level: '52%',
      condition: 'b. 운동 및 지각의 완전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-07',
      level: '42%',
      condition: 'a. 운동 및 지각의 부전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-08',
      level: '64%',
      condition: 'b. 운동 및 지각의 완전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-09',
      level: '57%',
      condition: 'a. 전 범위의 마비(total paralysis)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-10',
      level: '30%',
      condition: '(1) 운동 및 지각의 부전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-11',
      level: '57%',
      condition: '(2) 운동 및 지각의 완전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-12',
      level: '22%',
      condition: '(1) 운동 및 지각의 부전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-13',
      level: '36%',
      condition: '(2) 운동 및 지각의 완전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-14',
      level: '22%',
      condition: '(1) 운동 및 지각의 부전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-15',
      level: '46%',
      condition: '(2) 운동 및 지각의 완전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-16',
      level: '13%',
      condition: '(1) 운동 및 지각의 부전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-17',
      level: '27%',
      condition: '(2) 운동 및 지각의 완전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-18',
      level: '19%',
      condition: '(1) 운동 및 지각의 부전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-19',
      level: '41%',
      condition: '(2) 운동 및 지각의 완전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-20',
      level: '16%',
      condition: '(1) 운동 및 지각의 부전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-21',
      level: '35%',
      condition: '(2) 운동 및 지각의 완전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-22',
      level: '16%',
      condition: '(1) 운동 및 지각의 부전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-23',
      level: '33%',
      condition: '(2) 운동 및 지각의 완전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-24',
      level: '11%',
      condition: '(1) 운동 및 지각의 부전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-25',
      level: '19%',
      condition: '(2) 운동 및 지각의 완전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-26',
      level: '12%',
      condition: '(1) 운동 및 지각의 부전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-27',
      level: '24%',
      condition: '(2) 운동 및 지각의 완전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-28',
      level: '31%',
      condition: '(1) 운동 및 지각의 부전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-29',
      level: '55%',
      condition: '(2) 운동 및 지각의 완전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-30',
      level: '31%',
      condition: '(1) 운동 및 지각의 부전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-31',
      level: '55%',
      condition: '(2) 운동 및 지각의 완전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-32',
      level: '46%',
      condition: '(1) 운동 및 지각의 부전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-33',
      level: '62%',
      condition: '(2) 운동 및 지각의 완전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-34',
      level: '33%',
      condition: '(1) 운동 및 지각의 부전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-35',
      level: '49%',
      condition: '(2) 운동 및 지각의 완전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-36',
      level: '31%',
      condition: '(1) 운동 및 지각의 부전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-37',
      level: '55%',
      condition: '(2) 운동 및 지각의 완전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-38',
      level: '40%',
      condition: '(1) 운동 및 지각의 부전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-39',
      level: '62%',
      condition: '(2) 운동 및 지각의 완전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-40',
      level: '22%',
      condition: 'a. 운동 및 지각의 부전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-41',
      level: '32%',
      condition: 'b. 운동 및 지각의 완전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-42',
      level: '17%',
      condition: 'a. 운동 및 지각의 부전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-43',
      level: '26%',
      condition: 'b. 운동 및 지각의 완전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-44',
      level: '14%',
      condition: 'a. 운동 및 지각의 부전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-45',
      level: '23%',
      condition: 'b. 운동 및 지각의 완전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-46',
      level: '12%',
      condition: 'a. 운동 및 지각의 부전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-47',
      level: '17%',
      condition: 'b. 운동 및 지각의 완전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-48',
      level: '7%',
      condition: 'a. 운동 및 지각의 부전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-49',
      level: '11%',
      condition: 'b. 운동 및 지각의 완전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-50',
      level: '17%',
      condition: 'a. 운동 및 지각의 부전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-51',
      level: '23%',
      condition: 'b. 운동 및 지각의 완전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-52',
      level: '16%',
      condition: 'a. 운동 및 지각의 부전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-53',
      level: '22%',
      condition: 'b. 운동 및 지각의 완전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-54',
      level: '7%',
      condition: 'G. 장딴지 신경(sural nerve)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-55',
      level: '12%',
      condition: 'a. 운동 및 지각의 부전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-56',
      level: '15%',
      condition: 'b. 운동 및 지각의 완전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-57',
      level: '7%',
      condition: 'a. 운동 및 지각의 부전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-58',
      level: '12%',
      condition: 'b. 운동 및 지각의 완전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-59',
      level: '7%',
      condition: 'a. 운동 및 지각의 부전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-60',
      level: '12%',
      condition: 'b. 운동 및 지각의 완전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-61',
      level: '17%',
      condition: 'a. 운동 및 지각의 부전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-62',
      level: '36%',
      condition: 'b. 운동 및 지각의 완전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-63',
      level: '6%',
      condition: 'a. 운동 및 지각의 부전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-64',
      level: '10%',
      condition: 'b. 운동 및 지각의 완전마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-65',
      level: '7%',
      condition: 'M. 폐쇄 신경(obturator n.)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-66',
      level: '5%',
      condition: 'N. 대퇴의 외측 피(cutaneous) 신경',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 말초신경 원문-67',
      level: '6%',
      condition: 'O. 장골 서혜신경(ilio-inguinal n.)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    }
  ],
  abdomen: [
    {
      reference: '맥브라이드 복부 원문-01',
      level: '15%',
      condition: '1. 복대나 탈장대를 요하는 중등도의 팽융',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 복부 원문-02',
      level: '25%',
      condition: '2. 현저한 팽융과 복부근육 취약 : 외과수술은 요하지 않고 탈장대가 필요한것',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 복부 원문-03',
      level: '9%',
      condition: '1. 보조물(support)을 요하는 중등도의 취약 및 민감',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 복부 원문-04',
      level: '15%',
      condition: '2. 현저한 약화, 민감 및 복압으로 인한 동통 : 외과수술은 않음',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 복부 원문-05',
      level: '44%',
      condition: '3. 외과수술은 요하지 않으나 패드(pad), 인공삽입물을 요 하는 누공(fistula), 궤양(ulcer), 결장조루술 (colostomy)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 복부 원문-06',
      level: '15%',
      condition: 'D. 수술을 거절한 탈장대에 의하여 지지되지 않는 심한 팽융',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 복부 원문-07',
      level: '25%',
      condition: 'E. 재발성이고 탈장대로 지지되지 않으며 수술실패',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 복부 원문-08',
      level: '15%',
      condition: 'A. 파열되어 수술로 제거했으며 결과가 양호한 것',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 복부 원문-09',
      level: '15%',
      condition: '2. 외상성, 중등도의 증상, 수술 불필요',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 복부 원문-10',
      level: '15%',
      condition: '3. 수술후 결과 양호',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 복부 원문-11',
      level: '15%',
      condition: 'B. 성형수술후 결과 양호',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 복부 원문-12',
      level: '15%',
      condition: 'B. 직접적인 외상 또는 수술로 인하여 발생한 빈번하고 상당 히 심한 복통 발작, 구역질, 주기적인 내장 장해로 1-2 일의 휴무가 필요함',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 복부 원문-13',
      level: '30%',
      condition: 'C. 회복에 2-3주를 요하는 복통, 구역질, 내장 장해를 동반하 는 장기간의 심한 복부증상',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 복부 원문-14',
      level: '54%',
      condition: 'D. X-선 소견상 현저한 장폐색이 명백하고 재개복술을 요하는 직접 외상이나 복부수술후 속발한 장기간의 극심한 복통',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 복부 원문-15',
      level: '11%',
      condition: '1. 적절한 치료후에 남은 가볍고 단기간의 점막염증(카타르 성 증상)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 복부 원문-16',
      level: '20%',
      condition: '2. 상당한 기간의 치료를 요하는 것',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 복부 원문-17',
      level: '35%',
      condition: '3. 장기간의 치료를 요하는 출혈성 궤양',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 복부 원문-18',
      level: '20%',
      condition: 'B. 중등도의 일반 수술후유증, 가끔 악화되며 수술 불가능한 궤양, 특수한 식이요법이나 치료기간을 요하는 것',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 복부 원문-19',
      level: '35%',
      condition: 'C. 수술하지 않은 심한 궤양, 식이요법과 휴식으로 치료 안되 며, 대변에 피가 섞여 나오고 항상 복통이 있음',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 복부 원문-20',
      level: '54%',
      condition: 'D. 내과적 및 외과적 치료로 호전되지 않는 극심한 궤양. 전 신상태가 악화되며 장기간의 휴무가 필요함',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 복부 원문-21',
      level: '15%',
      condition: '1. 간비대, 가벼운 황달, 가벼운 구역질 및 구토, 가끔 휴 무 필요',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 복부 원문-22',
      level: '30%',
      condition: '2. 간비대, 압통, 황달, 중등도의 위 장애, 구역질 및 구 토, 복수는 없음. 정기적인 휴무 필요',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 복부 원문-23',
      level: '54%',
      condition: '3. 심한 중독증상. 전신상태 악화',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 복부 원문-24',
      level: '79%',
      condition: '4. 극심한 증상, 복부팽창, 복수있고 문정맥 폐색(portal vein obstrution). 장기간의 휴무 필요',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 복부 원문-25',
      level: '15%',
      condition: '2. 간헐적인 심한 산통. 급성 황달. 오한. 발열. 2-3일간의 휴무 필요',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 복부 원문-26',
      level: '35%',
      condition: '3. 더 빈번한 산통 및 기타 관련 증상이 나타남. 내과적 및 외과적 치료로 호전되지 않음',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 복부 원문-27',
      level: '55%',
      condition: '4. 극심한 증상과 합병증. 내과적 및 외과적 치료로 호전되 지 않음',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 복부 원문-28',
      level: '15%',
      condition: 'A. 열창, 완만히 치유된 것. 경한 췌장염',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 복부 원문-29',
      level: '26%',
      condition: 'B. 괴사. 출혈성 낭포. 심한 소화불량. 당뇨증',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    }
  ],
  femaleReproductive: [
    {
      reference: '맥브라이드 여성생식기 원문-01',
      level: '15%',
      condition: 'A. 경한 불쾌감. 빈뇨. 변비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 여성생식기 원문-02',
      level: '25%',
      condition: 'B. A의 중등도',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 여성생식기 원문-03',
      level: '35%',
      condition: 'C. 자궁경부의 궤양을 동반한 A의 중증 자궁후굴증(retroversion) 자궁전굴증(antiflexion)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 여성생식기 원문-04',
      level: '15%',
      condition: 'A. 감염의 합병증. 유착증. 불임증. 경한 성교통증',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 여성생식기 원문-05',
      level: '25%',
      condition: 'B. A의 중등도',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 여성생식기 원문-06',
      level: '35%',
      condition: 'C. A의 중증',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    }
  ],
  rectum: [
    {
      reference: '맥브라이드 직장 원문-01',
      level: '15%',
      condition: '1. 패드 착용이 위생상 필요한 정도',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 직장 원문-02',
      level: '26%',
      condition: '2. 간헐적인 장 조절기능의 상실로 영구적인 처치가 필요한 상태',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 직장 원문-03',
      level: '45%',
      condition: '3. 장 조절기능의 상실로 심한 지속성 누설과 빈번한 실금',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    }
  ],
  genitourinary: [
    {
      reference: '맥브라이드 비뇨생식기 원문-01',
      level: '30%',
      condition: 'A. 한쪽 신장 상실. 타측 신장은 정상',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 비뇨생식기 원문-02',
      level: '44%',
      condition: '1. 경증(mild)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 비뇨생식기 원문-03',
      level: '54%',
      condition: '2. 중등도(moderate)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 비뇨생식기 원문-04',
      level: '70%',
      condition: '3. 중증(severe)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 비뇨생식기 원문-05',
      level: '15%',
      condition: '2. 중등도. 지속적 단백뇨 및 뇨 원주(urinary cast). 경한 족부의 부종',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 비뇨생식기 원문-06',
      level: '54%',
      condition: '3. 중증. 현저한 단백뇨와 뇨 원주(urinary cast) 및 하지 의 부종. 심장증상 동반',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 비뇨생식기 원문-07',
      level: '100%',
      condition: '4. 극심한 단백뇨, 뇨 원주(urinary cast) 및 혈뇨. 심한 부종. 빈번한 휴무',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 비뇨생식기 원문-08',
      level: '30%',
      condition: '2. 빈번하고 심한 산통발작. 1-2주간의 휴무를 요하는 것. 수술할 수 없는 상태',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 비뇨생식기 원문-09',
      level: '15%',
      condition: '2. 빈번하고 중등도로 심한 산통발작. 배액처치를 요하는 것',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 비뇨생식기 원문-10',
      level: '30%',
      condition: '3. 빈번한 휴무와 입원을 요하는 심한 신장 기능 손상',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 비뇨생식기 원문-11',
      level: '15%',
      condition: '2. 감염. 방광내 결석. 배뇨시 빈번한 통증. 간헐적인 휴무 를 요하는 것',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 비뇨생식기 원문-12',
      level: '25%',
      condition: '3. 감염. 전신상태 악화. 주기적으로 입원을 요하는 것',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 비뇨생식기 원문-13',
      level: '40%',
      condition: '4. 보호장치(기저귀)를 필요로 하는 요실금',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 비뇨생식기 원문-14',
      level: '54%',
      condition: '1. 수술후에도 보호장치(기저귀)를 필요로 하는 것',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 비뇨생식기 원문-15',
      level: '26%',
      condition: '2. 구축과 섬유질증식증으로 일할 때 자극을 주는 것',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 비뇨생식기 원문-16',
      level: '9%',
      condition: '1. 조기의 외과적 처치. 간헐적인 확장술을 요하는 중등도 의 요도협착',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 비뇨생식기 원문-17',
      level: '55%',
      condition: '2. 늦은 외과적 처치로 요실금과 요의 유출이 있는 것',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 비뇨생식기 원문-18',
      level: '19%',
      condition: '2. 빈번한 확장술과 휴무를 요하는 것',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 비뇨생식기 원문-19',
      level: '19%',
      condition: '1. 빈번한 확장술과 휴무를 요하는 것',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 비뇨생식기 원문-20',
      level: '15%',
      condition: 'A. 1/4 이상 상실',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 비뇨생식기 원문-21',
      level: '15%',
      condition: 'B. 성교불능(impotency). 발기부전(loss of erection)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 비뇨생식기 원문-22',
      level: '25%',
      condition: 'D. 양쪽 상실',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 비뇨생식기 원문-23',
      level: '15%',
      condition: '1. 중등도. 만성. 외과적 치료로 호전되지 않음. 간헐적인 휴무가 필요',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 비뇨생식기 원문-24',
      level: '25%',
      condition: '2. 중증. 전립선과 정관에 까지 파급',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    }
  ],
  arthritis: [
    {
      reference: '맥브라이드 관절염 원문-01',
      level: '22%',
      condition: 'A. 일반적인 전신성 증상. 다발성 관절 침습. 구축은 없고 부은 것은 정상으로 회복. 경도의 완고한 동통과 피로. 년 1회 이내의 일정기간 휴무 필요',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 관절염 원문-02',
      level: '31%',
      condition: 'B. 일반적인 전신성 증상은 A와 같음. 매년 2-3회 휴무 필요',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 관절염 원문-03',
      level: '46%',
      condition: 'C. 일반적인 전신성 증상은 A와 같음. 완고한 관절 부종. 구 축이 시작되었지만 노무에는 지장을 주지않는 상태. 매년 3-4회의 침상안정을 요하는 것',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 관절염 원문-04',
      level: '11%',
      condition: 'A. 일반증상 : 여러관절 침범. 구축없음. 경도의 통증. 고관 절, 척주, 슬관절 및 수지관절의 골변연화. 휴무는 불필요',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 관절염 원문-05',
      level: '21%',
      condition: 'B. 일반증상 : A와 동일. 1개 이상의 주요관절에 중등도로 심한 동통의 악화. 매년 1-2회의 휴무를 요함',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 관절염 원문-06',
      level: '46%',
      condition: 'C. 일반증상 : A나 B와 같음. 다수의 동통성 관절 종창. 장기 간의 휴무를 요함',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 관절염 원문-07',
      level: '15%',
      condition: 'A. 일반증상 : 완고한 경도의 통증. 피로. 심부인대 및 근육 침범. 매년 1-2회의 휴무 필요. 감염 확인은 불가능',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 관절염 원문-08',
      level: '25%',
      condition: 'B. A의 증상이 중등도임',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 관절염 원문-09',
      level: '35%',
      condition: 'C. 일반증상 : A와 같음. 침상안정을 요하고 통증과 피로가 완쾌되지 않는 것',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 관절염 원문-10',
      level: '15%',
      condition: 'A. 다수의 관절에 유리체가 있음. 경한 주기적인 침슴. 직업 병의 의증. 간헐적인 휴무를 요하는 것',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 관절염 원문-11',
      level: '25%',
      condition: 'B. A의 증상이 중등도임',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 관절염 원문-12',
      level: '10%',
      condition: 'A. 경증의 주기적인 침습이 여러관절에 오고, 직종에 따라 2 년에 1회 정도 악화되는 것',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 관절염 원문-13',
      level: '15%',
      condition: 'B. A의 증상이 중등도임. 매년 1회 정도의 휴무 필요',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 관절염 원문-14',
      level: '30%',
      condition: 'C. A의 증상이 중증임. x-ray 소견상 다수 관절에 변형이 있 음. 작업의 종류가 제한되는 중등도의 관절강직',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 관절염 원문-15',
      level: '10%',
      condition: 'A. 경증의 주기적인 활액낭염이 여러부위에 있고, 특정직업과 관련성이 의심되는 것. 간헐적인 휴무를 요하는 것',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 관절염 원문-16',
      level: '25%',
      condition: 'B. A의 증상이 중등도임',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 관절염 원문-17',
      level: '9%',
      condition: 'A. 경증의 주기적인 건초염이 여러부위에 있고, 특정직업과 관련성이 의심되는 것. 간헐적인 휴무 필요',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 관절염 원문-18',
      level: '14%',
      condition: 'B. A의 증상이 중등도임',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    }
  ],
  tuberculosis: [
    {
      reference: '맥브라이드 결핵 원문-01',
      level: '15%',
      condition: '1.과거의 치료성적이 양호하며, 적극적 치료후 4년 경과 : x-ray 소견상 양성. 객담검사상 음성. 체중감소 없음. 공동 (cavity) 없음. 흉부수술 안했고 병소 확대 소견 없는 것',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 결핵 원문-02',
      level: '25%',
      condition: '2. 적극적 치료후 3년 경과 : 객담검사상 음성. 중등도의 전 신증상. 주기적인 미열. 체중유지 곤란. 공동없고 흉부수 술 시행하지 않은 것',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 결핵 원문-03',
      level: '35%',
      condition: '3. 적극적 치료후 2-3년 경과 : 객담검사상 음성. 운동시 호 흡곤란 증상있음. 산재성 나음(rale). 체중유지 곤란. 흉 부수술 시행 : 치료성적 양호',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 결핵 원문-04',
      level: '100%',
      condition: '1. 지속적이고 진행성임. 중증의 증상. x-ray 소견상 양성. 공동이 있고 객담검사상 양성. 입원 또는 격리치료를 요하 는 것',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 결핵 원문-05',
      level: '100%',
      condition: '1. 다른 장기의 결핵 : 흉부소견 동반에 관계없이 활동성임',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    }
  ],
  thorax: [],
  heart: [
    {
      reference: '맥브라이드 심장·혈관계 원문-01',
      level: '9%',
      condition: 'A. 국소병변 경미. 제한된 육체적 활동을 계속 할수있음. 이 상한 불쾌감 없음. 피로, 호흡단축 또는 족부에 부종이 있 는 것',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 심장·혈관계 원문-02',
      level: '24%',
      condition: 'B. 국소적 병변이 국소적임. 제한된 육체적 활동으로도 명백한 불쾌감, 피로, 호흡단축이 있으며, 청색증은 없으 나 운동시 부정맥이 나타나는 것',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 심장·혈관계 원문-03',
      level: '55%',
      condition: 'C. 국소적 병변과 증상이 B와 동일. 청색증과 부정맥을 동반. 위의 증상들이 침상안정으로 잘 호전되는 것',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 심장·혈관계 원문-04',
      level: '81%',
      condition: 'D. 점차로 중해지는 대상부전증상(decompensation)을 동반한 국소적 병변. 침상안정으로 대상부전증상이 충분히 호전 됨. 반드시 앉아서만 일하는 직업에만 종사해야 하는 상 태',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 심장·혈관계 원문-05',
      level: '100%',
      condition: 'E. 장기간의 침상안정을 요하는 대상부전증상을 동반한 국소 적 병변. 앉아서 일하는 직업에서도 호흡곤란의 경미한 호 전 또는 호전없음 및 대상부전증상이 완고한것',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 심장·혈관계 원문-06',
      level: '9%',
      condition: 'A. 명백한 국소병변을 확인할 수 없고, 신속히 회복되는 드문 통증발작',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 심장·혈관계 원문-07',
      level: '14%',
      condition: 'B. 병변과 심전도에 의하여 확인된 경도의 국소증상. 수일간 의 안정으로 회복되는 간헐적인 통증발작',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 심장·혈관계 원문-08',
      level: '44%',
      condition: 'C. 병변과 심한 국소증상. 3-6주마다 발작. 심장증상이 항상 완전히 호전되지 않는 상태',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 심장·혈관계 원문-09',
      level: '100%',
      condition: 'D. 병변과 극심한 국소증상. 운동시마다 발작. 점진적인 대상 부전증상',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 심장·혈관계 원문-10',
      level: '55%',
      condition: 'B. 한정된 작업으로도 2회째 발작. 신체소견이 완고함. 심전 도에 이상소견 있음',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 심장·혈관계 원문-11',
      level: '80%',
      condition: 'C. 한정된 작업으로도 3회째 발작. 심전도에 이상소견 있음. 명백하고 완고한 신체소견. 침상안정으로 호전안됨',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 심장·혈관계 원문-12',
      level: '100%',
      condition: 'D. 안정을 취해도 심한 증상. 심전도에 이상소견 있음. 신체 소견 양성',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 심장·혈관계 원문-13',
      level: '19%',
      condition: 'C. 기능성 빈맥. 관련된 심장병변이 있음. 매우 빈번한 발작. 안정시의 맥박이 100-120회/분',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 심장·혈관계 원문-14',
      level: '24%',
      condition: 'D. 발작적(돌발성)인 빈맥. 중등도이지만 명백한 심장호흡 기의 병변과의 연관성이 있는것',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 심장·혈관계 원문-15',
      level: '54%',
      condition: 'E. 발작적인 빈맥이 보다 중증의 심장호흡기의 병변을 동반한 것',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 심장·혈관계 원문-16',
      level: '55%',
      condition: 'B. 중등도의 팽창. 점진적인 악화증상. 수술로 호전 불가능',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 심장·혈관계 원문-17',
      level: '100%',
      condition: 'C. 심한 팽창증상. 진행성 및 절박성. 수술로 호전 불가능',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 심장·혈관계 원문-18',
      level: '24%',
      condition: 'B. 중등도의 팽창. 점진적인 악화증상. 수술로 호전 불가능. 직업전환을 요함',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 심장·혈관계 원문-19',
      level: '55%',
      condition: 'C. 심한 팽창과 점진적인 악화증상. 수술로 호전 불가능. 취 업 가능한 직업이 극히 제한적임',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 심장·혈관계 원문-20',
      level: '10%',
      condition: 'A. 경한 박동장애 증상. 휴무 불필요',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 심장·혈관계 원문-21',
      level: '24%',
      condition: 'B. 중등도의 증상. 진행성 팽창. 수술로 회복 가능. 직업을 바꿀 필요있음',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 심장·혈관계 원문-22',
      level: '55%',
      condition: 'C. 심한 진행성 팽창. 수술로 회복 불가능. 취업 가능한 직업 이 극히 제한적임',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 심장·혈관계 원문-23',
      level: '79%',
      condition: 'D. C의 증상이 극심하고 중증의 심장증상을 동반한 것',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 심장·혈관계 원문-24',
      level: '15%',
      condition: 'B. 수축기 혈압이 160 이상의 혈압상승. 경한 신장, 심장 또 는 뇌증상',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 심장·혈관계 원문-25',
      level: '30%',
      condition: 'C. 수축기 혈압이 190mmHg . 그에 상응하는 이완기 혈압상승 이 있는 고혈압과 신장, 심장 또는 뇌증상이 진단된 것',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 심장·혈관계 원문-26',
      level: '65%',
      condition: 'D. 수축기 혈압이 200mmHg. 그에 상응하는 이완기 혈압상승이 있는 고혈압과 신장, 심장 또는 뇌증상이 동반한 것',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 심장·혈관계 원문-27',
      level: '100%',
      condition: 'E. 수축기 혈압이 200mmHg. 그에 상응하는 이완기 혈압상승이 있는 고혈압과 신장, 심장 또는 뇌증상을 동반하고 빈번한 입원을 요하는 것',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 심장·혈관계 원문-28',
      level: '11%',
      condition: '1. 족배동맥의 박동 촉지. 경도의 족부 동통. 피로',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 심장·혈관계 원문-29',
      level: '19%',
      condition: '2. 족배동맥의 박동 소실. 중등도의 족부 동통. 수시간의 작업으로 휴식기를 요하고 직업전환을 요하는 것',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 심장·혈관계 원문-30',
      level: '35%',
      condition: '3. 발가락의 변색 시작. 심한 경련. 작업시 피로함. 때때로 입원과 직업전환을 요하는 것',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 심장·혈관계 원문-31',
      level: '55%',
      condition: '4. 발가락의 변색 및 궤양 발생. 극심한 경련. 작업시 피로 하고 입원과 치료로 호전됨. 취업 가능한 직업이 극히 제한적임',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 심장·혈관계 원문-32',
      level: '100%',
      condition: '5. 두 발의 절단을 요하는 괴저',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 심장·혈관계 원문-33',
      level: '11%',
      condition: '1. 하지나 족부에 정맥의 팽창. 몇시간 서 있으면 중등도의 종창생김. 혈전성 정맥염(thrombophlebitis), 궤양 등이 없고 탄력붕대을 감으면 증상 완화됨',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 심장·혈관계 원문-34',
      level: '25%',
      condition: '2. 다리의 사행성 정맥(tortuous vein). 하지와 족부에 심 한 종창. 기립자세의 여부에 관계없이 완고한 증상. 혈 전성 정맥염, 궤양 부위가 존재함',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 심장·혈관계 원문-35',
      level: '45%',
      condition: '3. 다리의 사행성 정맥류양 종창(tortuous varicosities). 하지나 족부의 극심한 종창. 국소증상 완고함. 반복되는 전성 정맥염과 완고한 궤양 등이 있음',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 심장·혈관계 원문-36',
      level: '7%',
      condition: '1. 장시간 서 있거나 걸을때 다리가 가볍게 붓지만 휴식은 불필요',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 심장·혈관계 원문-37',
      level: '25%',
      condition: '2. 장시간 서 있거나 걸을때 다리가 중등도로 붓고 휴식이 필요함',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 심장·혈관계 원문-38',
      level: '40%',
      condition: '3. 다리에 완고한 고도의 종창이 계속되고 침상안정이 정기 적으로 필요함',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 심장·혈관계 원문-39',
      level: '55%',
      condition: '4. 다리에 완고한 극도의 종창이 계속되고 빈번한 휴무가 필요함',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 심장·혈관계 원문-40',
      level: '11%',
      condition: '1. 장거리 보행시 객관적으로 인정될만한 경도의 피로로 빈 번한 휴식을 요하는 것',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 심장·혈관계 원문-41',
      level: '19%',
      condition: '2. 장거리 보행시 중등도의 피로, 경련및 통증이 오고 빈번 하게 휴식을 위해 서게 됨',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 심장·혈관계 원문-42',
      level: '40%',
      condition: '3. 단거리 보행으로도 심한 피로, 경련및 통증이 오고 절대 입원 안정을 요하며, 입원에 의하여 상당히 호전되는 것',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 심장·혈관계 원문-43',
      level: '64%',
      condition: '4. 위의 증상이 극도이고, 입원해도 호전안되어 걷기만 하 면 심한 경련과 통증이 오는 것',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    }
  ],
  headBrain: [
    {
      reference: '맥브라이드 두부·뇌·척수 원문-01',
      level: '10%',
      condition: 'B. 기질적인 신경학적 증상이 없는 직경 1인치의 민감한 두 개골 결손부의 존재',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 두부·뇌·척수 원문-02',
      level: '19%',
      condition: 'C. 기질적인 신경학적 증상이 없는 직경 2인치의 민감한 두 개골 결손부의 존재',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 두부·뇌·척수 원문-03',
      level: '23%',
      condition: '2. 제5 뇌신경 : 최고한(안면통 또는 마비는 이 장해율을 감산하여 평가함)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 두부·뇌·척수 원문-04',
      level: '21%',
      condition: '3. 제7 뇌신경 : 최고한(안면추형, 언어기능장애는 이 장해 율을 감산하여 평가함)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 두부·뇌·척수 원문-05',
      level: '10%',
      condition: '4. 제9 뇌신경 : 최고한(연하장애는 이 장해율을 감산하여 평가함)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 두부·뇌·척수 원문-06',
      level: '35%',
      condition: '5. 제10 뇌신경 : 최고한(발성기능의 상실, 위장장애, 심장 장애는 이 장해율을 감산하여 평가함)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 두부·뇌·척수 원문-07',
      level: '25%',
      condition: '6. 제11 뇌신경 : 최고한(목과 어깨의 운동성 마비에 있어 서의 평가)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 두부·뇌·척수 원문-08',
      level: '15%',
      condition: '7. 제12 뇌손상 : 혀를 놀리는 것, 먹는 것, 삼키는 것에 대한 평가',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 두부·뇌·척수 원문-09',
      level: '15%',
      condition: 'A. 경미한 주기적 발작',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 두부·뇌·척수 원문-10',
      level: '35%',
      condition: 'B. 중등도, 지속적',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 두부·뇌·척수 원문-11',
      level: '74%',
      condition: 'C. 모든 운동에 있어서 중증',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 두부·뇌·척수 원문-12',
      level: '100%',
      condition: 'D. 극도의 중증 : 모든 운동이 불확실, 두 다리의 마비',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 두부·뇌·척수 원문-13',
      level: '34%',
      condition: 'A. 중등도, 운동성 및 감각성 언어장애의 복합장애',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 두부·뇌·척수 원문-14',
      level: '80%',
      condition: 'B. 중증',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 두부·뇌·척수 원문-15',
      level: '16%',
      condition: 'a. 약간의 조정이 필요',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 두부·뇌·척수 원문-16',
      level: '26%',
      condition: 'b. 중등도의 조정이 필요',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 두부·뇌·척수 원문-17',
      level: '36%',
      condition: 'c. 많은 조정이 필요',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 두부·뇌·척수 원문-18',
      level: '56%',
      condition: 'd. 극도의 증상, 정신병으로 이행중인 것',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 두부·뇌·척수 원문-19',
      level: '16%',
      condition: 'A. 사회적, 직업적 활동에 있어서 완전한 관해(remission) : 적응력의 경미한 감소 또는 적응력의 감소 없음 *관해:병의 증상이 경감 또는 완화되는 것',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 두부·뇌·척수 원문-20',
      level: '25%',
      condition: '1. 경도의 증상과 조정',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 두부·뇌·척수 원문-21',
      level: '36%',
      condition: '2. 중등도의 증상과 조정',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 두부·뇌·척수 원문-22',
      level: '56%',
      condition: '3. 고도의 증상으로 부분적인 감독을 요하는 것',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 두부·뇌·척수 원문-23',
      level: '76%',
      condition: '4. 극도의 증상, 감독자 아래에서만 작업이 허용될 정도의 관해',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 두부·뇌·척수 원문-24',
      level: '100%',
      condition: '5. 감금을 요하고 관해없음',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 두부·뇌·척수 원문-25',
      level: '15%',
      condition: '1. 경도의 운동신경, 감각신경장애 및 정신장해와 조정',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 두부·뇌·척수 원문-26',
      level: '31%',
      condition: '2. 중등도의 운동신경, 감각신경장애 및 정신장해 (각개의 장해는 시각, 사지, 청각에 참조)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 두부·뇌·척수 원문-27',
      level: '56%',
      condition: '3. 고도의 운동신경, 감각신경장애 및 정신장해 (각개의 장해는 발현증상, 사지, 강직, 마비, 시각, 청각에 참조)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 두부·뇌·척수 원문-28',
      level: '100%',
      condition: '4. 극도의 운동신경, 감각신경장애및 정신장해. 관해없음 (각개의장해는 정신병적 발현증상, 사지, 강직, 마비, 시각에 참조) *관해:병의 증상이 경감 또는 완화되는 것',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 두부·뇌·척수 원문-29',
      level: '15%',
      condition: '1. 년 1회 이내의 경도의 경련발작',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 두부·뇌·척수 원문-30',
      level: '24%',
      condition: '2. 6개월에 1회 이내의 투약으로 조절가능한 중등도의 경 련발작',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 두부·뇌·척수 원문-31',
      level: '45%',
      condition: '3. 2-3개월마다 1회의, 투약으로 억제되지 않는 심한 경 련발작',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 두부·뇌·척수 원문-32',
      level: '65%',
      condition: '4. 매월 1회의 극심한 경련발작, 정신상태 양호하고 신체 적 기능상실 없음',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 두부·뇌·척수 원문-33',
      level: '100%',
      condition: '5. 신체적 장해, 정신상태 황폐, 매주 1회의 경련발작 (항상 같은 동작으로 신체적 장해와 정신상태의 황폐가 온 상태)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 두부·뇌·척수 원문-34',
      level: '16%',
      condition: '2. 3개월마다 1회의 중등도의 의식상실 : 투약으로 조절 가능',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 두부·뇌·척수 원문-35',
      level: '26%',
      condition: '3. 매월 1회의 심한 의식상실로 쇠약과 둔마를 야기한 것. 투약으로 조절 불가능',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 두부·뇌·척수 원문-36',
      level: '66%',
      condition: '4. 매주 1회 이상의 극심한 의식상실로 둔마와 신경증을 야기하는 것.시간의 작업만이 가능. 빈번한 휴무가 필요함',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    }
  ],
  face: [
    {
      reference: '맥브라이드 안면 원문-01',
      level: '10%',
      condition: 'A. 부정교합(malocclusion)을 수반한 상악골 골절',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 안면 원문-02',
      level: '10%',
      condition: 'B. 부정교합을 수반한 하악골 골절',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 안면 원문-03',
      level: '10%',
      condition: 'C. 하악골 관절돌기의 동통성 부정교합',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 안면 원문-04',
      level: '17%',
      condition: '1. 운동이 1/4-1/2인치로 제한된 것',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 안면 원문-05',
      level: '19%',
      condition: 'Ⅲ. 전체 치아(teeth)의 상실로 보철(prothesis)',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 안면 원문-06',
      level: '19%',
      condition: 'Ⅳ. 혀(tongue)의 상실, 1/3',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 안면 원문-07',
      level: '7%',
      condition: 'Ⅴ. 이개(귓바퀴. ear auricle)의 상실',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 안면 원문-08',
      level: '9%',
      condition: 'Ⅵ. 호흡장애를 일으키는 코뼈(nose)의 손상',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    }
  ],
  ear: [
    {
      reference: '맥브라이드 귀 원문-01',
      level: '100%',
      condition: '● 타측귀의 청력 완전 상실',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 귀 원문-02',
      level: '74%',
      condition: '● 타측귀의 청력 1피트에서 가능',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 귀 원문-03',
      level: '69%',
      condition: '● 타측귀의 청력 2피트에서 가능',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 귀 원문-04',
      level: '64%',
      condition: '● 타측귀의 청력 5피트에서 가능',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 귀 원문-05',
      level: '54%',
      condition: '● 타측귀의 청력 10피트에서 가능',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 귀 원문-06',
      level: '30%',
      condition: '● 타측귀의 청력 15피트에서 가능',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 귀 원문-07',
      level: '20%',
      condition: '● 타측귀의 청력 20피트에서 가능',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 귀 원문-08',
      level: '84%',
      condition: '● 타측귀의 골전도 있음',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 귀 원문-09',
      level: '64%',
      condition: '● 타측귀의 청력 1피트에서 가능',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 귀 원문-10',
      level: '59%',
      condition: '● 타측귀의 청력 2피트에서 가능',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 귀 원문-11',
      level: '54%',
      condition: '● 타측귀의 청력 5피트에서 가능',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 귀 원문-12',
      level: '43%',
      condition: '● 타측귀의 청력 10피트에서 가능',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 귀 원문-13',
      level: '26%',
      condition: '● 타측귀의 청력 15피트에서 가능',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 귀 원문-14',
      level: '20%',
      condition: '● 타측귀의 청력 20피트에서 가능',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 귀 원문-15',
      level: '54%',
      condition: '● 타측귀의 청력 1피트에서 가능',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 귀 원문-16',
      level: '43%',
      condition: '● 타측귀의 청력 2피트에서 가능',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 귀 원문-17',
      level: '36%',
      condition: '● 타측귀의 청력 5피트에서 가능',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 귀 원문-18',
      level: '30%',
      condition: '● 타측귀의 청력 10피트에서 가능',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 귀 원문-19',
      level: '20%',
      condition: '● 타측귀의 청력 15피트에서 가능',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 귀 원문-20',
      level: '12%',
      condition: '● 타측귀의 청력 20피트에서 가능',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 귀 원문-21',
      level: '43%',
      condition: '● 타측귀의 청력 2피트에서 가능',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 귀 원문-22',
      level: '30%',
      condition: '● 타측귀의 청력 5피트에서 가능',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 귀 원문-23',
      level: '26%',
      condition: '● 타측귀의 청력 10피트에서 가능',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 귀 원문-24',
      level: '20%',
      condition: '● 타측귀의 청력 15피트에서 가능',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 귀 원문-25',
      level: '12%',
      condition: '● 타측귀의 청력 20피트에서 가능',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 귀 원문-26',
      level: '30%',
      condition: '● 타측귀의 청력 5피트에서 가능',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 귀 원문-27',
      level: '26%',
      condition: '● 타측귀의 청력 10피트에서 가능',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 귀 원문-28',
      level: '20%',
      condition: '● 타측귀의 청력 15피트에서 가능',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 귀 원문-29',
      level: '8%',
      condition: '● 타측귀의 청력 20피트에서 가능',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 귀 원문-30',
      level: '26%',
      condition: '● 타측귀의 청력 10피트에서 가능',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 귀 원문-31',
      level: '20%',
      condition: '● 타측귀의 청력 15피트에서 가능',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 귀 원문-32',
      level: '5%',
      condition: '● 타측귀의 청력 20피트에서 가능',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 귀 원문-33',
      level: '5%',
      condition: '● 타측귀의 청력 15피트에서 가능',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    },
    {
      reference: '맥브라이드 귀 원문-34',
      level: '2%',
      condition: '● 타측귀의 청력 20피트에서 가능',
      measurement: '직업계수 5 기준 · 원문 조건의 고정 여부와 객관적 검사 결과를 확인'
    }
  ]
} as const satisfies Record<string, readonly McbrideSourceRow[]>;
