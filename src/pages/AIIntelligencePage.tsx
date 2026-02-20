import ServicePage from './ServicePage';

export default function AIIntelligencePage() {
  return (
    <ServicePage
      wingNum="02"
      titleKey="wing2_title"
      descriptionKey="wing2_description"
      capabilitiesKeys={[
        'wing2_tag1',
        'wing2_tag2',
        'wing2_tag3',
        'wing2_tag4',
      ]}
      gradient="from-purple-500 to-pink-600"
      glowColor="#a855f7"
    />
  );
}
