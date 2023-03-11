import React, {  useState } from 'react';
import ReactPaginate from 'react-paginate';
import "./paginate.css"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


function OfficeItemsPaginate({ currentOfficeItems }) {
  console.log("Items ",currentOfficeItems)
	return (
	  <>
		{currentOfficeItems.map((od,index)=>(
            <div className="show-preview">
                <div  key={od.Name}>
                    <button>
                        <p style={{fontWeight:"bold", textTransform:"uppercase"}}>{ od.Name }</p>
                        {od.Details.map((d,index)=>(
                            <>
                                <p>Name : {d.Name}</p>
                                <p>Phone No : {d.PhoneNo}</p>
                            </>
                        ))}
                    </button>
                </div>
            </div>
        )
        )}
	  </>
	);
  }


function PaginatedOffice({ itemsperpage,officeDetails }) {
  
    const [itemsPerPage] = useState(itemsperpage);
   
    // starting point of items --- > itemOffset = 0
    const [itemOffset, setItemOffset] = useState(0);

    // ending point --- > endOffset = 0 + 4 = 4
    const endOffset = itemOffset + itemsPerPage;

    // slice the whole items --- > 0 to 4 
    const currentItems = officeDetails.slice(itemOffset, endOffset);

    // Total page count
    const pageCount = Math.ceil(officeDetails.length / itemsPerPage);

    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % officeDetails.length;
      setItemOffset(newOffset);
    };
  
    return (
      <>
        <OfficeItemsPaginate currentOfficeItems={currentItems}/>
        <ReactPaginate
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          pageCount={pageCount}
          renderOnZeroPageCount={null}
          activeClassName={'item active '}
          breakClassName={'item break-me '}
          breakLabel={'...'}
          containerClassName={'pagination'}
          disabledClassName={'disabled-page'}
          marginPagesDisplayed={2}
          nextClassName={"item next "}
          nextLabel={<ArrowForwardIcon style={{ fontSize: 27, width: 150 }} />}
          pageClassName={'item pagination-page '}
          previousClassName={"item previous"}
          previousLabel={<ArrowBackIcon style={{ fontSize: 27, width: 150 }} />}
        />
      </>
    );
}

export default PaginatedOffice;
  