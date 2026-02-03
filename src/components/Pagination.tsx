import { Pagination as AntPagination } from 'antd';

type PaginationProps = {
    current: number;
    total: number;
    pageSize: number;
    onChange: (page: number, pageSize: number) => void;
};

const Pagination = ({ current, total, pageSize, onChange }: PaginationProps) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
            <AntPagination
                current={current}
                total={total}
                pageSize={pageSize}
                onChange={onChange}
                onShowSizeChange={onChange}
                showSizeChanger={false}
                showTotal={(count, range) => `${range[0]}-${range[1]} of ${count}`}
            />
        </div>
    );
};

export default Pagination;
