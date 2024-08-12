import React from 'react';
import QRCode from 'qrcode.react';

const QRCodeComponent = ({ url }) => {


    return (
        <div className="p-2 bg-white     shadow-lg">
            <QRCode value={url} />
        </div>
    );
};

export default QRCodeComponent;
