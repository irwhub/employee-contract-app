import { Card } from '../components/Card';
import { DisabilityEstimator } from '../components/DisabilityEstimator';

export function DisabilityRatePage() {
  return (
    <Card
      title="장해율"
      subtitle="진단명과 검사 기준을 바탕으로 산재·제3보험·맥브라이드 장해율 후보를 확인합니다."
    >
      <DisabilityEstimator />
    </Card>
  );
}
