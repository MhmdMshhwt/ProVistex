import ServicePage from './ServicePage';

export default function CloudCyberPage() {
  return (
    <ServicePage
      wingNum="03"
      titleKey="wing3_title"
      descriptionKey="wing3_description"
      capabilitiesKeys={[
        'wing3_tag1',
        'wing3_tag2',
        'wing3_tag3',
        'wing3_tag4',
      ]}
      gradient="from-red-500 to-orange-500"
      glowColor="#ef4444"
    />
  );
}
