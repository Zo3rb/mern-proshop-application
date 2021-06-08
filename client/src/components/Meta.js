import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keyword" content={keywords} />
        </Helmet>
    );
};

Meta.defaultProps = {
    title: "Welcome to ProShop",
    description: "We Sell The Best Electronics Products For Cheap",
    keywords: "Electronics, Cheap Electronics, Buy Electronics"
};

export default Meta;
