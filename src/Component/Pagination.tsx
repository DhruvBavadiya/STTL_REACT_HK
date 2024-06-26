import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { useContext, useEffect, useState } from 'react'
import { getAllProducts } from '../Service/product'
import { AuthContext } from '../Context/authContext'

export default function Pagination() {
    const [total, setTotal] = useState<number>(0)
    const {current,setCurrent} = useContext(AuthContext)

    useEffect(() => {
        setCurrent(1)
        const getAll = async () => {
            getAllProducts().then((res) => {
                setTotal(res.length)
            })
        }
        getAll()
    }, [])

    const productsPerPage = 8
    const totalPages = Math.ceil(total / productsPerPage)

    const handlePageClick = (pageNumber: number) => {
        setCurrent(pageNumber)
    }

    const handlePreviousClick = () => {
        if (current > 1) {
            setCurrent(current - 1)
        }
    }

    const handleNextClick = () => {
        if (current < totalPages) {
            setCurrent(current + 1)
        }
    }

    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-6 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <a
                    href="#"
                    onClick={handlePreviousClick}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Previous
                </a>
                <a
                    href="#"
                    onClick={handleNextClick}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Next
                </a>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{(current - 1) * productsPerPage + 1}</span> to <span className="font-medium">{Math.min(current * productsPerPage, total)}</span> of{' '}
                        <span className="font-medium">{total}</span> results
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <a
                            href="#"
                            onClick={handlePreviousClick}
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </a>
                        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                            <a
                                key={pageNumber}
                                href="#"
                                onClick={() => handlePageClick(pageNumber)}
                                aria-current={current === pageNumber ? 'page' : undefined}
                                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${current === pageNumber ? 'bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'}`}
                            >
                                {pageNumber}
                            </a>
                        ))}
                        <a
                            href="#"
                            onClick={handleNextClick}
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </a>
                    </nav>
                </div>
            </div>
        </div>
    )
}
