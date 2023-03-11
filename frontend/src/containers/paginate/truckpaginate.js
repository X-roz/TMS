import axios from "axios";
import React, {  useState } from 'react';
import ReactPaginate from 'react-paginate';
import Cookies from 'js-cookie'
import "./paginate.css"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';




function TruckItemsPaginate({ currentTruckItems }) {

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

  const formatTime = (date)=>{
    if (date === ""){
      return date
    }else{
      return date.substring(0,10)
    }
    
  }

	return (
	  <>
		{currentTruckItems.map((td,index)=>(
            <div className="truck-preview">
                <div  key={td.truck_no}>
                    <button id="outer-button">
                        <p style={{fontWeight:"bold", textTransform:"uppercase"}}>{ td.truck_no }</p>

                        <p>Engine No: {td.engine_no}</p>

                        {td.emi_date === ""?<></>:<p>Emi Date: {td.emi_date}</p>}
                        
                        <p>Insurance Date: {formatTime(td.insurance_date)}</p>
                        
                        <p>FC date: {formatTime(td.fc_date)}</p>

                        <p>Truck RC: &nbsp;&nbsp;
                          <button id="inner-button" onClick={(e)=>{handleViewButton(td.TruckRc,e)}}>
                          view</button>
                        </p>

                        <p>Insurance Paper: &nbsp;&nbsp;
                          <button id="inner-button" onClick={(e)=>{handleViewButton(td.Insurance,e)}}>
                          view</button>
                        </p>

                        <p>National Tax: &nbsp;&nbsp; 
                          <button id="inner-button" onClick={(e)=>{handleViewButton(td.TruckImg,e)}}>
                          view</button>
                        </p>

                        <p>National Permit: &nbsp;&nbsp; 
                          <button id="inner-button" onClick={(e)=>{handleViewButton(td.NpTax,e)}}>
                          view</button>
                        </p>

                        <p>Quater Tax: &nbsp;&nbsp; 
                          <button id="inner-button" onClick={(e)=>{handleViewButton(td.QuaterTax,e)}}>
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


function PaginatedTruck({ itemsperpage,truckDetails }) {
  
    const [itemsPerPage] = useState(itemsperpage);
   
    // starting point of items --- > itemOffset = 0
    const [itemOffset, setItemOffset] = useState(0);

    // ending point --- > endOffset = 0 + 4 = 4
    const endOffset = itemOffset + itemsPerPage;

    // slice the whole items --- > 0 to 4 
    const currentItems = truckDetails.slice(itemOffset, endOffset);

    // Total page count
    const pageCount = Math.ceil(truckDetails.length / itemsPerPage);

    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % truckDetails.length;
      setItemOffset(newOffset);
    };
  
    return (
      <>
        <TruckItemsPaginate currentTruckItems={currentItems}/>
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

export default PaginatedTruck;
  