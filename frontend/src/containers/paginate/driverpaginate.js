import axios from "axios";
import React, {  useState } from 'react';
import Cookies from 'js-cookie'
import ReactPaginate from 'react-paginate';
import "./paginate.css"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


function DriverItemsPaginate({ currentDriverItems }) {

  function openInNewTab(href) {
    Object.assign(document.createElement('a'), {
      target: '_blank',
      rel: 'noopener noreferrer',
      href: href,
    }).click();
  }

  const handleViewButton = (fileId,e)=>{
    console.log(fileId)
    axios.defaults.headers.common['Authorization'] = Cookies.get("access_token")
    axios.get("http://localhost:9000/tms/truck/get-file-view-link?file_id="+fileId)
    .then((res)=>{
      if (res.data.Success){
        openInNewTab(res.data.Data);
      }
    })
  } 

	return (
	  <>
		{currentDriverItems.map((dd,index)=>(
            <div className="truck-preview">
                <div  key={dd.Name}>
                    <button id="outer-button">
                        <p style={{fontWeight:"bold", textTransform:"uppercase"}}>{ dd.Name }</p>
                        <p>ph No: {dd.PhoneNumber}</p>
                        <p>Address: {dd.Address}</p>
                        <p>Acc No: {dd.AccountNumber}</p>
                        <p>ifsc: {dd.IfscCode}</p>
                        <p>License: &nbsp;&nbsp;
                          <button id="inner-button" onClick={(e)=>{handleViewButton(dd.License,e)}}>
                          view</button>
                        </p>
                    </button>
                </div>
            </div>
        )
        )}
	  </>
	);
  }


function PaginatedDriver({ itemsperpage, driverDetails }) {
  
    const [itemsPerPage] = useState(itemsperpage);
   
    // starting point of items --- > itemOffset = 0
    const [itemOffset, setItemOffset] = useState(0);

    // ending point --- > endOffset = 0 + 4 = 4
    const endOffset = itemOffset + itemsPerPage;

    // slice the whole items --- > 0 to 4 
    const currentItems = driverDetails.slice(itemOffset, endOffset);

    // Total page count
    const pageCount = Math.ceil(driverDetails.length / itemsPerPage);

    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % driverDetails.length;
      setItemOffset(newOffset);
    };
  
    return (
      <>
        <DriverItemsPaginate currentDriverItems={currentItems}/>
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

export default PaginatedDriver;