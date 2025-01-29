<?php
require_once __DIR__ . '/../app/vendor/autoload.php';
require_once __DIR__ . '/../scripts/database.php';

use Twig\Environment;
use Twig\Loader\FilesystemLoader;

$loader = new FilesystemLoader(__DIR__ . '/templates');
$twig = new Environment($loader);

$limit = 5;

if (isset($_GET['page']) && ctype_digit($_GET['page'])) {
    $page = (int) $_GET['page'];
    $offset = ($page - 1) * $limit;
} else {
    $offset = 0;
    $page = 1;
}

if (isset($_GET['sort']) && $_GET['sort'] == 'old') {
    $order = 'ASC';
} else {
    $order = 'DESC';
}

$db = Database::getInstance()->getConnection();

try {
    $TotalResult = $db->query("SELECT COUNT(*) as `total` FROM `afisha`");

    if (!$TotalResult) {
        throw new Exception("Ошибка выполнения запроса: " . $db->error);
    }

    $TotalRows = $TotalResult->fetch_assoc();
    $totalPages = round((int) $TotalRows['total'] / $limit, 0, PHP_ROUND_HALF_DOWN);
} catch (Exception $e) {
    echo "Произошла ошибка: " . $e->getMessage();
}

$stmt = $db->prepare("SELECT * FROM `afisha` ORDER BY `date` $order LIMIT ? OFFSET ?");
$stmt->bind_param('ii', $limit, $offset);

$stmt->execute();

$result = $stmt->get_result();
$rows = $result->fetch_all(MYSQLI_ASSOC);

$months = [
    'January' => 'января',
    'February' => 'февраля',
    'March' => 'марта',
    'April' => 'апреля',
    'May' => 'мая',
    'June' => 'июня',
    'July' => 'июля',
    'August' => 'августа',
    'September' => 'сентября',
    'October' => 'октября',
    'November' => 'ноября',
    'December' => 'декабря'
];

foreach ($rows as &$event) {
    $date = new DateTime($event['date']);

    $englishMonth = $date->format('F');

    $formattedDate = $date->format('d F Y');

    $russianMonth = $months[$englishMonth];
    $formattedDate = str_replace($englishMonth, $russianMonth, $formattedDate);

    $event['formatted_date'] = $formattedDate;
}

echo $twig->render('afisha.html.twig', ['events' => $rows, 'totalPages' => $totalPages, 'currentPage' => $page, 'sort' => $_GET["sort"]]);