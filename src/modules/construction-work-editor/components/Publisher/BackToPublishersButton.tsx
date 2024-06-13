import {useEffect, useState} from 'react'
import NavigationButton from 'components/ui/button/NavigationButton'
import Box from 'components/ui/layout/Box'
import {ConstructionWorkEditorRoute} from 'modules/construction-work-editor/types/routes'
import 'modules/construction-work-editor/components/Publisher/BackToPublishersButton.css'

const START_SCROLL_POSITION = 100

const BackToPublishersButton = () => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const handleScroll = () => {
    const position = window.scrollY
    setScrollPosition(position)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, {passive: true})

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div
      className="StickToBottom"
      data-hidden={scrollPosition < START_SCROLL_POSITION}>
      <Box flex flexContainer>
        <NavigationButton
          data-flex
          label="Ga terug naar publishers"
          url={ConstructionWorkEditorRoute.publishers}
          variant="secondary"
        />
      </Box>
    </div>
  )
}

export default BackToPublishersButton
