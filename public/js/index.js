function get_car_object(car, idx) {
    return `<div class="carRow row ${idx % 2 === 0 ? 'even_row' : 'odd_row'}" data-m="${car._id}">
        <div class="col-3"><a>${car.make}</a></div>
        <div class="col-3"><a>${car.model}</a></div>
        <div class="col-2"><a>${car.year}</a></div>
        <div class="col-2"><a>${car.price}</a></div>
    </div>`
}

function showList(cars) {
    $('#car_list').empty();
    cars.forEach((car, idx) => {
        console.log(car);
        $('#car_list').append(get_car_object(car, idx));
    });

    $('.carRow').on('click', function () {
        const car_id = $(this).attr('data-m');
        location.href = "detail.html?car_id=" + car_id;
    });
}


$.get("/get_all_cars")
    .done(function (data) {
        if (data.message === "success") {
            showList(data.data);
        }
    });
