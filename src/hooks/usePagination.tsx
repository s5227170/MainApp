import { useState, MouseEvent, useEffect } from 'react';

interface pageProps {
    id: number;
    current: boolean;
    ellipsis: boolean;
}

function usePagination(initialState: any) {
    const { itemsPerPage, data, startFrom } = initialState;

    const perPage = itemsPerPage ? itemsPerPage : 10;
    const pages = Math.ceil(data.length / perPage);
    const pagination: pageProps[] = [];
    const [currentPage, setCurrentPage] = useState(startFrom <= pages ? startFrom : 1);
    const [slicedData, setSlicedData] = useState([...data].slice((currentPage - 1) * perPage, currentPage * perPage));

    useEffect(() => {
        setSlicedData(data)
    }, [data])

    let ellipsisLeft = false;
    let ellipsisRight = false;
    for (let i = 1; i <= pages; i++) {
        if (i === currentPage) {
            pagination.push(
                { id: i, current: true, ellipsis: false }
            );
        } else {
            if (i < 2 || i > pages - 1 || i === currentPage - 1 || i === currentPage + 1) {
                pagination.push(
                    { id: i, current: false, ellipsis: false }
                );
            } else if (i > 1 && i < currentPage && !ellipsisLeft) {
                pagination.push(
                    { id: i, current: false, ellipsis: true }
                );
                ellipsisLeft = true;
            } else if (i < pages && i > currentPage && !ellipsisRight) {
                pagination.push(
                    { id: i, current: false, ellipsis: true }
                );
                ellipsisRight = true;
            }
        }
    }

    const changePage = (page: number, e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (page !== currentPage) {
            setCurrentPage(page);
            setSlicedData([...data].slice((page - 1) * perPage, page * perPage));
        }
    };

    const goToPrevPage = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setCurrentPage((prevVal: number) => prevVal - 1 === 0 ? prevVal : prevVal - 1);
        if (currentPage !== 1) {
            setSlicedData([...data].slice((currentPage - 2) * perPage, (currentPage - 1) * perPage));
        }
    };

    const goToNextPage = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setCurrentPage((prevVal: number) => prevVal === pages ? prevVal : prevVal + 1);
        if (currentPage !== pages) {
            setSlicedData([...data].slice(currentPage * perPage, (currentPage + 1) * perPage));
        }
    };

    return {
        slicedData,
        pagination,
        prevPage: goToPrevPage,
        nextPage: goToNextPage,
        changePage
    };
}

export default usePagination;