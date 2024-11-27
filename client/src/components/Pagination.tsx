import React, { useState, useEffect } from 'react'

const Pagination = ({listing} : any) => {
    const [currentPage, setCurrentPage] = useState(1); 
  const [listingPerPage] = useState(2); 

  useEffect(() => {
    setCurrentPage(1);
  }, [listing]);

  const totalPages = Math.ceil(listing.length / listingPerPage);
  const indexOfLastListing = currentPage * listingPerPage;
  const indexOfFirstListing = indexOfLastListing - listingPerPage;
  const currentListing = listing.slice(indexOfFirstListing, indexOfLastListing);
  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
 
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
        <div className="flex justify-center mt-6">
        <button 
          className="border px-4 py-2 mx-2 bg-gray-300 rounded text-gray-700 hover:bg-gray-400 disabled:opacity-50"
          onClick={handlePrevPage} 
          disabled={currentPage === 1}
        >
          Previous
        </button>
        
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`px-4 py-2 mx-2 ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-white text-blue-500'} border rounded`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        
        <button 
          className="border px-4 py-2 mx-2 bg-gray-300 rounded text-gray-700 hover:bg-gray-400 disabled:opacity-50"
          onClick={handleNextPage} 
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  )
}

export default Pagination