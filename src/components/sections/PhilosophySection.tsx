// TODO: Replace with Claude Design export implementation (MB-35)
import type { PhilosophySection as PhilosophySectionType } from '@/types/content'
import PhilosophySectionClient from './PhilosophySectionClient'

export default function PhilosophySection({ data }: { data: PhilosophySectionType }) {
  return <PhilosophySectionClient data={data} />
}
