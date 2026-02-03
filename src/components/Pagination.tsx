import { Pagination as AntPagination } from 'antd';

type PaginationProps = {
    current: number;
    total: number;
    pageSize: number;
    onChange: (page: number, pageSize: number) => void;
};

const Pagination = ({ current, total, pageSize, onChange }: PaginationProps) => {
    if (total <= pageSize) {
        return null;
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
            <AntPagination
                current={current}
                total={total}
                pageSize={pageSize}
                onChange={onChange}
                showSizeChanger={false}
            />
        </div>
    );
};

export default Pagination;
