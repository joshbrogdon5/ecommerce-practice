select p.id, p.title, p.description, p.image, p.price, c.quantity, c.total
from cart c join products p on c.products_id = p.id
order by p.id