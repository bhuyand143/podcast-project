import React from 'react'
import SearchListItem from './SearchListItem';

function SearchList(props) {
  return (
   <>
        <div>
            <div className="container">
            <div className="row">
                {
                props?.podcasts?.map((element, idx) => {
                    return <div className="col-md-3 py-4">
                    <SearchListItem movie={element}  key={idx} />
                    </div>
                })}
            </div>
            </div>
        </div>
   </>
  )
}

export default SearchList