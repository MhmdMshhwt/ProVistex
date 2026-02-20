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
      gradient="from-teal-500 to-emerald-600"
      glowColor="#14b8a6"
      problemKey="wing2_problem"
      solutionKey="wing2_solution"
    />
  );
}
