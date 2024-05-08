import React from 'react';
import PictureAsPdfSharpIcon from '@mui/icons-material/PictureAsPdfSharp';
import InsertDriveFileSharpIcon from '@mui/icons-material/InsertDriveFileSharp';

interface FileDisplayProps {
    fileName: string;
    fileType: string;
    fileUrl: string;
}

const FileDisplay: React.FC<FileDisplayProps> = ({ fileName, fileType, fileUrl }) => {
    const getFileIcon = (type: string) => {
        switch (type) {
            case 'pdf':
                return <PictureAsPdfSharpIcon />;
            default:
                return <InsertDriveFileSharpIcon />;
        }
    };

    return (
        <a href={fileUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '10px', paddingLeft: '5px', paddingRight: '2.5px', borderRadius: '5px', backgroundColor: '#E2E8F0' }}>
            {getFileIcon(fileType)}
            <p style={{ margin: '0', fontWeight: 'medium' }}>{fileName}</p>
        </a>
    );
};

export default FileDisplay;
