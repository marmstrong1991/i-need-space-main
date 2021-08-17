const searchButton = document.getElementById('search');

searchButton.addEventListener('click', function () {
    const apiKey = document.getElementById('api-key').value;
    const address = document.getElementById('address').value;
    const norad = document.getElementById('norad').value;

    fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(
            address
        )}.json?access_token=${apiKey}`
    )
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < 3; i++) {
                const place = data.features[i].place_name;
                const longitude = data.features[i].center[0];
                const latitude = data.features[i].center[1];

                fetch(
                    `https://satellites.fly.dev/passes/${norad}?lat=${latitude}&lon=${longitude}&limit=1&days=15&visible_only=true`
                )
                    .then(response => response.json())
                    .then(data => {
                        const culmination = data[0].culmination;
                        const rise = data[0].rise;
                        const set = data[0].set;

                        const container =
                            document.querySelectorAll('.result')[i];

                        const placeName =
                            document.querySelectorAll('.place-name')[i];

                        const culminationTime =
                            document.querySelectorAll('.culmination-time')[i];
                        const riseTime =
                            document.querySelectorAll('.rise-time')[i];
                        const setTime =
                            document.querySelectorAll('.set-time')[i];

                        const culminationPosition = document.querySelectorAll(
                            '.culmination-position'
                        )[i];
                        const risePosition =
                            document.querySelectorAll('.rise-position')[i];
                        const setPosition =
                            document.querySelectorAll('.set-position')[i];

                        const culminationAngle =
                            document.querySelectorAll('.culmination-angle')[i];
                        const riseAngle =
                            document.querySelectorAll('.rise-angle')[i];
                        const setAngle =
                            document.querySelectorAll('.set-angle')[i];

                        placeName.textContent = place;

                        culminationTime.textContent =
                            culmination.utc_datetime.split('.')[0];
                        riseTime.textContent = rise.utc_datetime.split('.')[0];
                        setTime.textContent = set.utc_datetime.split('.')[0];

                        culminationPosition.textContent = culmination.az_octant;
                        risePosition.textContent = rise.az_octant;
                        setPosition.textContent = set.az_octant;

                        culminationAngle.textContent =
                            culmination.alt + '° above the horizon';
                        riseAngle.textContent =
                            rise.alt + '° above the horizon';
                        setAngle.textContent = set.alt + '° above the horizon';

                        container.style.display = 'block';
                    })
                    .catch(error => console.log(error));
            }
        })
        .catch(error => console.log(error));
});
