import { TimeWindow } from '@/lib/types/filter'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'

const SearchSwitch = ({
  searchType,
  timeWindow,
  handleTimeWindow,
  timeWindowsOptions,
}: {
  searchType: string
  timeWindow: string
  handleTimeWindow: (newTimeWindow: TimeWindow) => void
  timeWindowsOptions: { value: string; label: string }[]
}) => {
  return (
    <div
      data-testid="search-switch"
      className={`w-96 flex flex-col justify-center items-center col-span-1 bg-background rounded-md shadow-sm ${
        searchType !== 'trending' ? 'hidden' : 'block'
      }`}
    >
      <ToggleGroup
        type="single"
        value={timeWindow}
        onValueChange={(newTimeWindow) =>
          handleTimeWindow(newTimeWindow as TimeWindow)
        }
        className="w-full flex flex-col"
      >
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">Popularidade no(a)</h3>
        </div>
        <div className="flex flex-row gap-2">
          {timeWindowsOptions.map((option) => (
            <ToggleGroupItem
              value={option.value}
              key={option.value}
              className="flex items-center gap-2 w-[90%]"
            >
              {option.label}
            </ToggleGroupItem>
          ))}
        </div>
      </ToggleGroup>
    </div>
  )
}

export default SearchSwitch
