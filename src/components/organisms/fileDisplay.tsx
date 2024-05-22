import React from 'react';
import { Chip } from '@mui/material';
import PictureAsPdfSharpIcon from '@mui/icons-material/PictureAsPdfSharp';
import InsertDriveFileSharpIcon from '@mui/icons-material/InsertDriveFileSharp';
import ImageSharpIcon from '@mui/icons-material/ImageSharp';
import TextFieldsSharpIcon from '@mui/icons-material/TextFieldsSharp';
import DescriptionSharpIcon from '@mui/icons-material/DescriptionSharp';
import SlideshowSharpIcon from '@mui/icons-material/SlideshowSharp';
import TableChartSharpIcon from '@mui/icons-material/TableChartSharp';

interface FileDisplayProps {
    fileName: string;
    fileType: string;
    fileUrl: string;
}

const FileDisplay: React.FC<FileDisplayProps> = ({ fileName, fileType, fileUrl }) => {
    const getFileIcon = (type: string) => {
        switch (type) {
            case 'pdf':
                return <PictureAsPdfSharpIcon style={{ color: '#ffffff' }} />;
            case 'gif':
            case 'png':
            case 'jpeg':
            case 'jpeg2000':
            case 'jpg':
            case 'tif':
            case 'tiff':
                return <ImageSharpIcon style={{ color: '#ffffff' }} />;
            case 'txt':
                return <TextFieldsSharpIcon style={{ color: '#ffffff' }} />;
            case 'doc':
            case 'docx':
                return <DescriptionSharpIcon style={{ color: '#ffffff' }} />;
            case 'ppt':
            case 'pptx':
                return <SlideshowSharpIcon style={{ color: '#ffffff' }} />;
            case 'xls':
            case 'xlsx':
                return <TableChartSharpIcon style={{ color: '#ffffff' }} />;
            default:
                return <InsertDriveFileSharpIcon style={{ color: '#ffffff' }} />;
        }
    };

    const getBackgroundColor = (type: string) => {
        switch (type) {
            case 'pdf':
                return '#D32F2F'; // Red for PDF files
            case 'gif':
                return '#FFC107'; // Amber for GIF files
            case 'png':
                return '#4CAF50'; // Green for PNG files
            case 'jpeg':
            case 'jpeg2000':
            case 'jpg':
                return '#FF9800'; // Orange for JPEG files
            case 'tif':
            case 'tiff':
                return '#9C27B0'; // Purple for TIFF files
            case 'txt':
                return '#3F51B5'; // Indigo for TXT files
            case 'doc':
            case 'docx':
                return '#2196F3'; // Blue for DOC files
            case 'ppt':
            case 'pptx':
                return '#FF5722'; // Deep Orange for PPT files
            case 'xls':
            case 'xlsx':
                return '#4CAF50'; // Green for XLS files
            default:
                return '#607D8B'; // Blue Grey for other files
        }
    };

    return (
        <a href={fileUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <Chip
                icon={getFileIcon(fileType)}
                label={fileName}
                style={{
                    backgroundColor: getBackgroundColor(fileType),
                    color: '#ffffff',
                    width: 'auto',
                    padding: '10px',
                    display: 'flex',
                    alignItems: 'center'
                }}
            />
        </a>
    );
};

export default FileDisplay;
