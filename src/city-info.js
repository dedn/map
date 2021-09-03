import * as React from 'react';

function CityInfo(props) {
    const {info} = props;
    const displayName = `${info.city}, ${info.state}`;
    console.log('info', info)

    return (
        <>
            {info.count > 1 && (

                <ul>
                    <li>Agent name here</li>
                    <li>Agent name here</li>
                    <li>Agent name here</li>
                    <li>Agent name here</li>
                </ul>



            )}
            {info.count === undefined && (
                <div>
                    <div>
                        {displayName} |{' '}
                        <a
                            target="_new"
                            href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${displayName}`}
                        >
                            Wikipedia
                        </a>
                    </div>
                    <img width={240} src={info.image}/>
                </div>
            )}
        </>

    );
}

export default React.memo(CityInfo);
