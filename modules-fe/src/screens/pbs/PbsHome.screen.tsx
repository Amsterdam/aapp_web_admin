import Column from 'components/ui/layout/Column'
import Screen from 'components/ui/layout/Screen'
import Table from 'components/ui/table/Table'
import ScreenTitle from 'components/ui/text/ScreenTitle'

type DataType = {
  id: number
  title?: string
  date?: string
  age?: number
  location?: string
}

const data: DataType[] = [
  {id: 1, title: 'Project 1', date: '1apr'},
  {id: 2, title: 'Project 2', date: '1apr'},
  {id: 3, title: 'Project 3', date: '1apr', location: 'Leiden'},
  {id: 4, title: 'Project 4', date: '1apr'},
  {id: 5, title: 'Project 5', date: '1apr', age: 43},
  {id: 6, title: 'Project 6', date: '1apr'},
  {id: 7, title: 'Project 7', date: '1apr'},
  {id: 8, title: 'Project 8', date: '1apr', age: 19, location: 'Amsterdam'},
  // 8 rows
  {id: 9, title: 'Project 9', date: '1apr', age: 23},
  {id: 10, title: 'Project 10', date: '1apr'},
  {id: 11, title: 'Project 11', date: '3apr'},
  {id: 12, title: 'Project 12', date: '2apr', location: 'Zaandam'},
  {id: 13, title: 'Project 13', date: '1apr'},
  {id: 14, title: 'Project 14', date: '1apr'},
  {id: 15, title: 'Project 15', date: '1apr', age: 23},
  {id: 16, title: 'Project 16', date: '1apr', location: 'Amsterdam'},
]

const HomeScreen = () => {
  return (
    <Screen>
      <Column gutter="lg">
        <ScreenTitle
          subtitle="Amsterdam App"
          title="Projectbeheersysteem"
        />
        <Table
          columnNames={['id', 'date', 'title', 'age', 'location']}
          data={data}
        />
      </Column>
    </Screen>
  )
}

export default HomeScreen
