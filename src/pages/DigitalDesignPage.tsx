import ServicePage from './ServicePage';

export default function DigitalDesignPage() {
  return (
    <ServicePage
      wingNum="04"
      titleKey="wing4_title"
      descriptionKey="wing4_description"
      capabilitiesKeys={[
        'wing4_tag1',
        'wing4_tag2',
        'wing4_tag3',
        'wing4_tag4',
      ]}
      gradient="from-blue-500 to-cyan-600"
      glowColor="#3b82f6"
    />
  );
}
