import { buildMetadata } from '@/lib/metadata';
import ResourcesContent from '@/components/pages/ResourcesContent';

export const metadata = buildMetadata({
  title: 'Resources & Documents',
  description: 'Download technical spec sheets, allergen declarations, nutritional information, and quality certifications for the full Indo Aquatic range.',
  path: '/resources',
});

export default function ResourcesPage() {
  return <ResourcesContent />;
}
