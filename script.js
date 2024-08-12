  // Créer une illustration
  let illo = new Zdog.Illustration({
    element: '.zdog-canvas',
    rotate: { y: -Zdog.TAU/8 },
    dragRotate: true,
});

// Créer la barre verticale
let pole = new Zdog.Rect({
    addTo: illo,
    width: 5,
    height: 200,
    stroke: 5,
    color: '#666',
    translate: { x: 0, y: 50 },
});

// Créer le corps avec une légère inclinaison
let body = new Zdog.Rect({
    addTo: illo,
    width: 20,
    height: 40,
    stroke: 20,
    color: '#C25',
    translate: { x: -20, y: 10 },  // Le corps est proche de la barre
    rotate: { z: Zdog.TAU/16 },
});

// Créer la tête
let head = new Zdog.Shape({
    addTo: illo,
    stroke: 40,
    translate: { x: -20, y: -60 },
    color: '#EA0',
});

// Ajouter des yeux
let leftEye = new Zdog.Ellipse({
    addTo: head,
    diameter: 8,
    quarters: 2,
    translate: { x: -12, y: -10, z: 20 },
    color: '#000',
    fill: true,
    stroke: 3,
});

let rightEye = new Zdog.Ellipse({
    addTo: head,
    diameter: 8,
    quarters: 2,
    translate: { x: 12, y: -10, z: 20 },
    color: '#000',
    fill: true,
    stroke: 3,
});

// Ajouter un petit nez
let nose = new Zdog.Shape({
    addTo: head,
    path: [
        { x: -2 }, { x: 2 }, // Ligne horizontale du nez
    ],
    translate: { y: 0, z: 20 },
    stroke: 2,
    color: '#F28',
});

// Ajouter une bouche avec du rouge à lèvres
let mouth = new Zdog.Ellipse({
    addTo: head,
    diameter: 5,
    quarters: 2,
    translate: { y: 10, z: 20 },
    rotate: { z: Zdog.TAU/4 },
    color: '#E62',
    stroke: 2,
    fill: true,
});


// Répéter avec différentes positions et rotations pour couvrir la tête

// Ajouter une queue de cheval sinueuse
let ponytail = new Zdog.Shape({
    addTo: head,
    path: [
        { x: 0, y: -20 },
        { arc: [
            { x: -20, y: 30 },
            { x: 20, y: 40 },
        ]},
         { arc: [
            { x: -20, y: 60 },
            { x: 0, y: 80 },
        ]}, 
    ],
    translate: { y: 20, z: -10 },
    stroke: 8,
    color: '#333',
  });
  

// Créer le bras gauche
let leftArm = new Zdog.Shape({
    addTo: body,
    path: [{ y: 0 }, { y: -40 }],
    translate: { x: -30, y: -10 },
    rotate: { z: Zdog.TAU/8 },
    stroke: 10,
    color: '#636',
});

// Créer le bras droit
let rightArm = new Zdog.Shape({
    addTo: body,
    path: [{ y: 0 }, { y: -40 }],
    translate: { x: 30, y: -10 },
    rotate: { z: -Zdog.TAU/8 },
    stroke: 10,
    color: '#636',
});

// Créer les jambes
let leftLeg = new Zdog.Shape({
    addTo: body,
    path: [{ y: 0 }, { y: 40 }],
    translate: { x: -15, y: 50 },
    stroke: 10,
    color: '#636',
});

let rightLeg = new Zdog.Shape({
    addTo: body,
    path: [{ y: 0 }, { y: 40 }],
    translate: { x: 15, y: 50 },
    stroke: 10,
    color: '#636',
});

// Ajouter des chaussures comme dans talons hauts
let leftShoe = new Zdog.Ellipse({
    addTo: leftLeg,
    path : [{ y: 0 }, { y: 10 }],
    diameter: 15,
    quarters: 2,
    translate: { y: 50 },
    rotate: { z: Zdog.TAU / 4 },
    color: '#333',
    stroke: 5,
    fill: true,

});

let rightShoe = new Zdog.Ellipse({
    addTo: rightLeg,
    diameter: 15,
    quarters: 2,
    translate: { y: 50 },
    rotate: { z: Zdog.TAU / 4 },
    color: '#333',
    stroke: 5,
    fill: true,
});

// Fonction d'animation
function animate() {
    // Mouvement de rotation autour de la barre

    if (leftArm.translate.x < pole.translate.x + 10) {
        leftArm.rotate.z = Zdog.TAU / 4; // Adjust rotation to interact with the pole
      } else {
        leftArm.rotate.z = Zdog.easeInOut({
          time: Math.sin(illo.rotate.y),
          start: -Zdog.TAU / 8,
          end: Zdog.TAU / 4,
        });
      }
    
      // Check if the right arm is close to the pole
      if (rightArm.translate.x > pole.translate.x - 10) {
        rightArm.rotate.z = -Zdog.TAU / 4; // Adjust rotation to interact with the pole
      } else {
        rightArm.rotate.z = Zdog.easeInOut({
          time: Math.sin(illo.rotate.y),
          start: Zdog.TAU / 8,
          end: -Zdog.TAU / 4,
        });
        }
        
    illo.rotate.y += 0.03;

    // Mouvement du corps pour simuler la danse autour de la barre
    body.rotate.z = Zdog.easeInOut({
        time: Math.sin(illo.rotate.y),
        start: -Zdog.TAU/16,
        end: Zdog.TAU/16,
    });

    // Mouvement des bras pour attraper la barre
    leftArm.rotate.z = Zdog.easeInOut({
        time: Math.sin(illo.rotate.y),
        start: -Zdog.TAU/8,
        end: Zdog.TAU/4,
    });
    rightArm.rotate.z = Zdog.easeInOut({
        time: Math.sin(illo.rotate.y),
        start: Zdog.TAU/8,
        end: -Zdog.TAU/4,
    });

    // Mouvement des jambes avec effet de rebond
    leftLeg.rotate.x = Zdog.easeInOut({
        time: Math.sin(illo.rotate.y + Math.PI/2),
        start: -Zdog.TAU/16,
        end: Zdog.TAU/16,
    });
    rightLeg.rotate.x = Zdog.easeInOut({
        time: Math.sin(illo.rotate.y),
        start: Zdog.TAU/16,
        end: -Zdog.TAU/16,
    });

    // Mise à jour de l'illustration
    illo.updateRenderGraph();
    requestAnimationFrame(animate);
}

// Lancer l'animation
animate();