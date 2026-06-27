import { FlipQuizGame } from '../../../../../../components/shared/FlipQuizGame';


export default function PeopleQuizCardPage() {
  
  return (
    <FlipQuizGame 
      title="people" 
      description="Identify the people shown in the card. Don't lose your hearts!"
      type="noun"
      category="people" 
      excludeTag="family"
    />
  )
}