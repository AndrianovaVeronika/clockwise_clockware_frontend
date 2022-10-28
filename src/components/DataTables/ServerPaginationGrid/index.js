import * as React from 'react';
import {useEffect, useState} from 'react';
import {DataGrid, ukUA} from '@mui/x-data-grid';
import {useTranslation} from "react-i18next";

export default function ServerPaginationGrid({columns, getRowsAction, filters, ...props}) {
    const {i18n} = useTranslation();

    const [pageState, setPageState] = React.useState({
        isLoading: false,
        data: [],
        total: 0,
        page: 0,
        pageSize: 5
    });

    const [sortingOptions, setSortingOptions] = useState([]);
    const [sortingOptionsNeedToBeChecked, setSortingOptionsNeedToBeChecked] = useState(false);
    const [lastFieldClicked, setLastFieldClicked] = useState();

    useEffect(() => {
        if (sortingOptionsNeedToBeChecked) {
            setSortingOptions(old => old.filter(option => option.field !== lastFieldClicked));
            setSortingOptionsNeedToBeChecked(false);
        }
    }, [sortingOptions]);

    useEffect(() => {
        const fetchData = async () => {
            setPageState(old => ({...old, isLoading: true}));
            const response = await getRowsAction({
                page: pageState.page,
                limit: pageState.pageSize,
                order: sortingOptions.map(option => ([option.field, option.sort])),
                ...filters,
            });
            setPageState(old =>
                ({...old, isLoading: false, data: response.data || [], total: response.total}));
        }
        fetchData();
    }, [pageState.page, pageState.pageSize, filters, sortingOptions]);

    return (
        <>
            <DataGrid
                disableColumnFilter
                rows={pageState.data}
                rowCount={pageState.total}
                loading={pageState.isLoading}
                rowsPerPageOptions={[5]}
                pagination
                page={pageState.page}
                pageSize={pageState.pageSize}
                paginationMode="server"
                onPageChange={(newPage) =>
                    setPageState(old => ({...old, page: newPage}))}
                onPageSizeChange={(newPageSize) =>
                    setPageState(old => ({...old, pageSize: newPageSize}))}
                columns={columns}
                localeText={i18n.language === 'ua' ? ukUA.components.MuiDataGrid.defaultProps.localeText : undefined}
                sortingMode="server"
                onSortModelChange={(newSortModel) => {
                    if (!newSortModel[0]) {
                        setSortingOptionsNeedToBeChecked(true);
                    }
                    setSortingOptions(old => {
                        const oldDistinct = old.filter(option => option.field !== newSortModel[0]?.field);
                        return [...oldDistinct, ...newSortModel];
                    });
                }}
                onColumnHeaderClick={(header) => setLastFieldClicked(header.field)}
                sortModel={sortingOptions}
                {...props}
            />
        </>
    );
}
