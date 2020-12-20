import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store';
import './stylesheets/Browser.css';

const Browser: FC = () => {
    return(
        <div>
            <div className="section-browser">
                <div className="browser-navbar">
                    {/* Create a component for the bottons. Each component
                    will have as attributes - type(for the icon name), 
                    component(for the component to load on click, check routes for a tip) */}
                    <div className="crud-buttons">
                        {/* View all Button */}
                        <span className="material-icons">
                            view_headline
                        </span>
                        {/* Update Button */}
                        <span className="material-icons">
                            change_circle
                        </span>
                        {/* Create Button */}
                        <span className="material-icons">
                            add_circle
                        </span>
                        {/* Delete Button */}
                        <span className="material-icons">
                            delete_outline
                        </span>
                        </div>
                        <div className="search-buttons">
                        {/* Filter Button */}
                        <span className="material-icons">
                            filter_alt
                        </span>
                        {/* Search Button */}
                        <span className="material-icons">
                            filter_alt
                        </span>
                    </div>
                </div>
                <div className="browser-body">

                </div>
            </div>
        </div>
    );
}

export default Browser;