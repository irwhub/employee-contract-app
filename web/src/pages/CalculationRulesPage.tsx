import { Card } from '../components/Card';
import { EstimateCalculatorV2 } from '../components/EstimateCalculatorV2';

export function CalculationRulesPage() {
  return (
    <Card
      title="계산기"
      subtitle="교통사고·배상책임 사건에서 주요 손해 항목과 과실율을 넣어 대략적인 금액을 계산합니다."
    >
      <EstimateCalculatorV2 />
    </Card>
  );
}
