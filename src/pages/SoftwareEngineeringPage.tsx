import ServicePage from './ServicePage';

export default function SoftwareEngineeringPage() {
  return (
    <ServicePage
      wingNum="01"
      titleKey="wing1_title"
      descriptionKey="wing1_description"
      capabilitiesKeys={[
        'wing1_tag1',
        'wing1_tag2',
        'wing1_tag3',
        'wing1_tag4',
      ]}
      gradient="from-cyan-500 to-blue-600"
      glowColor="#06b6d4"
    />
  );
}
