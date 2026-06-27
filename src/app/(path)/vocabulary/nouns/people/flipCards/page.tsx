import { FlipCardExplorer } from '../../../../../../components/shared/FlipCardExplorer';


export default function PeopleFlipCardsPage() {

  return (
    <FlipCardExplorer 
      title="people" 
      subtitle="explorer" 
      description="Flip to learn people." 
      type="noun"
      category="people" 
      excludeTag="family"
    />
  )
}