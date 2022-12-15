import { Fragment, useEffect, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid'

import { setFilteringStatus, setSelectedDirections } from '../store/actions/journeys'
import { useDispatch, useSelector } from 'react-redux'
import { store } from '../store/rootReducer'
import { isArray } from 'lodash'



export const PlaceComboBox = ({ labelComboBox = "Field" },) => {
  const keyDirection = labelComboBox.toLowerCase()
  const dispatch = useDispatch();
  const placesTerms = store.getState().journeys.placesTerms
  const selectedDirections = useSelector((state) => state.journeys.selectedDirection[keyDirection])
  const places = Object.values(placesTerms)



  const [selected, setSelected] = useState([])
  const [query, setQuery] = useState('')

  const filteredPlaces =
    query === ''
      ? places
      : places.filter((places) =>
        places.name
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.toLowerCase().replace(/\s+/g, ''))
      )

  const setSelectedHandler = (places) => {
    const newDirections = {}
    newDirections[keyDirection] = String(places.id)
    dispatch(setSelectedDirections(newDirections))
    setSelected(places)
    dispatch(setFilteringStatus(true))
  }

  const checkSelectedDirections = (directions) => {
    if (isArray(directions)) {
      const selected = directions.length && placesTerms[directions[0]]
      setSelected(selected)
    } else {
      const selected = placesTerms[directions]
      setSelected(selected)
    }
  }

  useEffect(() => {
    checkSelectedDirections(selectedDirections)
  }, [selectedDirections])

  return (
    <div>
      <label htmlFor={labelComboBox} className="block text-sm font-medium text-gray-700">{labelComboBox}</label>
      <Combobox value={selected} onChange={(places) => setSelectedHandler(places)}>
        <div className="relative mt-1">
          <div className="relative mt-1">
            <Combobox.Input
              id={labelComboBox}
              className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-12 shadow-sm focus:border-cinnamon-500 focus:outline-none focus:ring-1 focus:ring-cinnamon-500 sm:text-sm"
              displayValue={(places) => places?.name}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredPlaces.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredPlaces.map((places) => (
                  <Combobox.Option
                    key={labelComboBox + places.id + 1}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-4 pr-4 ${active ? 'bg-gray-200 text-gray-900' : 'text-gray-900'
                      }`
                    }
                    value={places}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          key={labelComboBox + places.id + 2}
                          className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                            }`}
                        >
                          {places.name}
                        </span>
                        {selected ? (
                          <span
                            key={labelComboBox + places.id + 3}
                            className={`absolute inset-y-0 right-4 flex items-center pl-3 ${active ? 'text-cinnamon-600' : 'text-cinnamon-600'}`}
                          >
                            <CheckIcon
                              key={labelComboBox + places.id + 4}
                              className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}